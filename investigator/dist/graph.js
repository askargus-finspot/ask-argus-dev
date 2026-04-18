"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInvestigator = buildInvestigator;
const messages_1 = require("@langchain/core/messages");
const langgraph_1 = require("@langchain/langgraph");
const prompts_1 = require("./prompts");
const retry_1 = require("./retry");
const state_1 = require("./state");
const memory_1 = require("./memory");
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
const MAX_ITERATIONS = 3;
function extractText(content) {
    if (typeof content === 'string')
        return content;
    if (Array.isArray(content)) {
        return content
            .map((part) => typeof part === 'object' && part !== null && 'text' in part
            ? String(part.text)
            : '')
            .join('');
    }
    return '';
}
function parseJsonBlock(raw, schema) {
    const match = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match)
        return null;
    try {
        const parsed = JSON.parse(match[0]);
        return schema ? schema.parse(parsed) : parsed;
    }
    catch (e) {
        console.warn('[Investigator] JSON parse or validation failed:', e);
        return null;
    }
}
/**
 * Builds a LangGraph investigation workflow with optional short-term and long-term memory.
 *
 * Graph topology:
 * ```
 * START → memoryRetriever → planner → executor → verifier
 *                                          ↑__________|  (loop ≤ maxIterations)
 *                                       → correlator → summarizer → memorySaver → END
 * ```
 *
 * @example — with MongoDB memory
 * ```typescript
 * import { buildInvestigator, MongoDBInvestigationStore } from '@askargus/investigator';
 * import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
 * import { MongoClient } from 'mongodb';
 *
 * const mongo = new MongoClient(process.env.MONGO_URI!);
 * await mongo.connect();
 *
 * const store = new MongoDBInvestigationStore(mongo);
 * await store.start(); // create indexes
 *
 * const checkpointer = new MongoDBSaver({ client: mongo });
 *
 * const graph = buildInvestigator({ model, clients, store, checkpointer });
 *
 * // First run — stores findings in long-term memory
 * await graph.invoke(
 *   { symptom: 'API p99 latency spike', userId: 'alice' },
 *   { configurable: { thread_id: 'session-1' } },
 * );
 *
 * // Second run — memoryRetriever recalls the previous investigation
 * await graph.invoke(
 *   { symptom: 'latency degradation after deploy' },
 *   { configurable: { thread_id: 'session-2' } },
 * );
 * ```
 */
function buildInvestigator(deps) {
    const { model, clients, store, checkpointer, toolCatalog } = deps;
    const maxIterations = deps.maxIterations ?? MAX_ITERATIONS;
    const plannerSystem = (0, prompts_1.buildPlannerSystem)(toolCatalog);
    // -------------------------------------------------------------------------
    // Node: memoryRetriever
    // Searches long-term store for past investigations similar to the symptom.
    // Injects a formatted summary into state.memoryContext for the planner.
    // -------------------------------------------------------------------------
    async function memoryRetriever(state) {
        if (!store)
            return { memoryContext: '' };
        const context = await (0, memory_1.buildMemoryContext)(store, state.symptom, state.userId);
        return { memoryContext: context };
    }
    // -------------------------------------------------------------------------
    // Node: planner
    // LLM generates parallel QueryPlan[] informed by symptom + memory context.
    // -------------------------------------------------------------------------
    async function planner(state) {
        const systemContent = state.memoryContext.length > 0
            ? `${plannerSystem}\n\n---\nRelevant past investigations (use these to avoid redundant queries and target likely root causes):\n\n${state.memoryContext}`
            : plannerSystem;
        const reply = await model.invoke([
            new messages_1.SystemMessage(systemContent),
            new messages_1.HumanMessage(JSON.stringify({ symptom: state.symptom, timeRange: state.timeRange })),
        ]);
        const plans = parseJsonBlock(extractText(reply.content), zod_1.z.array(schemas_1.QueryPlanSchema)) ?? [];
        return { plan: plans };
    }
    // -------------------------------------------------------------------------
    // Node: executor
    // Calls MCP tools in parallel with retry. Skips already-executed plans.
    // -------------------------------------------------------------------------
    async function executor(state) {
        const done = new Set(state.results.map((r) => r.planId));
        const pending = state.plan.filter((p) => !done.has(p.id));
        const results = await Promise.all(pending.map((p) => (0, retry_1.executePlanWithRetry)(clients, p)));
        return { results };
    }
    // -------------------------------------------------------------------------
    // Node: verifier
    // LLM classifies results and optionally proposes follow-up queries.
    // -------------------------------------------------------------------------
    async function verifier(state) {
        const reply = await model.invoke([
            new messages_1.SystemMessage(prompts_1.VERIFIER_SYSTEM),
            new messages_1.HumanMessage(JSON.stringify(state.results)),
        ]);
        const parsed = parseJsonBlock(extractText(reply.content), schemas_1.VerifierOutputSchema);
        const followUps = (parsed?.verdicts ?? [])
            .map((v) => v.followUp)
            .filter((p) => p !== undefined && p !== null);
        return {
            plan: followUps,
            iterations: followUps.length > 0 ? 1 : 0,
        };
    }
    // -------------------------------------------------------------------------
    // Node: correlator
    // LLM cross-references results: temporal, causal, and entity correlations.
    // -------------------------------------------------------------------------
    async function correlator(state) {
        const reply = await model.invoke([
            new messages_1.SystemMessage(prompts_1.CORRELATOR_SYSTEM),
            new messages_1.HumanMessage(JSON.stringify({ plan: state.plan, results: state.results })),
        ]);
        const findings = parseJsonBlock(extractText(reply.content), zod_1.z.array(schemas_1.FindingSchema)) ?? [];
        return { findings };
    }
    // -------------------------------------------------------------------------
    // Node: summarizer
    // LLM produces the final InvestigationReport.
    // -------------------------------------------------------------------------
    async function summarizer(state) {
        const reply = await model.invoke([
            new messages_1.SystemMessage(prompts_1.SUMMARIZER_SYSTEM),
            new messages_1.HumanMessage(JSON.stringify({
                symptom: state.symptom,
                plan: state.plan,
                results: state.results,
                findings: state.findings,
                resultCount: state.results.length,
            })),
        ]);
        return { messages: [reply] };
    }
    // -------------------------------------------------------------------------
    // Node: memorySaver
    // Persists the completed investigation to long-term store for future recall.
    // Runs after summarizer; failures are swallowed so the graph always completes.
    // -------------------------------------------------------------------------
    async function memorySaver(state) {
        if (!store)
            return {};
        const durationMs = Date.now() - state.startedAt;
        await (0, memory_1.saveInvestigation)(store, state, durationMs).catch((err) => {
            console.warn('[Investigator] Failed to save investigation to long-term memory:', err);
        });
        return {};
    }
    // -------------------------------------------------------------------------
    // Routing
    // -------------------------------------------------------------------------
    function routeAfterVerifier(state) {
        const done = new Set(state.results.map((r) => r.planId));
        const hasPending = state.plan.some((p) => !done.has(p.id));
        if (hasPending && state.iterations < maxIterations)
            return 'executor';
        return 'correlator';
    }
    // -------------------------------------------------------------------------
    // Graph assembly
    // -------------------------------------------------------------------------
    return new langgraph_1.StateGraph(state_1.InvestigationAnnotation)
        .addNode('memoryRetriever', memoryRetriever)
        .addNode('planner', planner)
        .addNode('executor', executor)
        .addNode('verifier', verifier)
        .addNode('correlator', correlator)
        .addNode('summarizer', summarizer)
        .addNode('memorySaver', memorySaver)
        .addEdge(langgraph_1.START, 'memoryRetriever')
        .addEdge('memoryRetriever', 'planner')
        .addEdge('planner', 'executor')
        .addEdge('executor', 'verifier')
        .addConditionalEdges('verifier', routeAfterVerifier, {
        executor: 'executor',
        correlator: 'correlator',
    })
        .addEdge('correlator', 'summarizer')
        .addEdge('summarizer', 'memorySaver')
        .addEdge('memorySaver', langgraph_1.END)
        .compile({ checkpointer, store });
}
//# sourceMappingURL=graph.js.map