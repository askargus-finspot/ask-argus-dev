import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import type { BaseStore } from '@langchain/langgraph-checkpoint';

import { END, START, StateGraph } from '@langchain/langgraph';

import {
  CORRELATOR_SYSTEM,
  buildPlannerSystem,
  SUMMARIZER_SYSTEM,
  VERIFIER_SYSTEM,
} from './prompts';
import { executePlanWithRetry } from './retry';
import { InvestigationAnnotation } from './state';
import { buildMemoryContext, saveInvestigation } from './memory';
import { z } from 'zod';
import { QueryPlanSchema, VerifierOutputSchema, FindingSchema } from './schemas';

import type { MCPClientRegistry } from './mcp';
import type { InvestigationState } from './state';
import type { Finding, MCPToolCatalog, QueryPlan } from './types';

const MAX_ITERATIONS = 3;

export interface InvestigatorDeps {
  /** LangChain chat model used for all LLM nodes. */
  model: BaseChatModel;
  /** Registry of MCP clients keyed by domain name. */
  clients: MCPClientRegistry;
  /** Available MCP tools keyed by domain; injected into the planner to avoid invented tool names. */
  toolCatalog?: MCPToolCatalog;
  /** Maximum verifier-loop iterations before forcing correlator (default: 3). */
  maxIterations?: number;
  /**
   * Long-term memory store (cross-session).
   * Use MongoDBInvestigationStore for persistence, or InMemoryStore for dev.
   *
   * When provided:
   *  - memoryRetriever searches past investigations and injects context into the planner.
   *  - memorySaver persists completed investigations for future recall.
   */
  store?: BaseStore;
  /**
   * Short-term memory checkpointer (session/thread scoped).
   * Pass a MongoDBSaver from @langchain/langgraph-checkpoint-mongodb for production.
   *
   * When provided, supply `{ configurable: { thread_id: '<id>' } }` on every invoke/stream
   * to resume or continue a specific investigation session.
   */
  checkpointer?: BaseCheckpointSaver | boolean;
}

export interface InvestigatorConfig extends InvestigatorDeps {
  prompts?: {
    planner?: string;
    verifier?: string;
    correlator?: string;
    summarizer?: string;
  };
}

interface VerifierVerdict {
  planId: string;
  status: 'useful' | 'empty' | 'suspicious';
  followUp?: QueryPlan;
}

interface VerifierOutput {
  verdicts: VerifierVerdict[];
}

function extractText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part) =>
        typeof part === 'object' && part !== null && 'text' in part
          ? String((part as { text: unknown }).text)
          : '',
      )
      .join('');
  }
  return '';
}

function parseJsonBlock<T>(raw: string, schema?: z.ZodType<T>): T | null {
  const match = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    return schema ? schema.parse(parsed) : (parsed as T);
  } catch (e) {
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
export function buildInvestigator(deps: InvestigatorDeps) {
  const { model, clients, store, checkpointer, toolCatalog } = deps;
  const maxIterations = deps.maxIterations ?? MAX_ITERATIONS;
  const plannerSystem = buildPlannerSystem(toolCatalog);

  // -------------------------------------------------------------------------
  // Node: memoryRetriever
  // Searches long-term store for past investigations similar to the symptom.
  // Injects a formatted summary into state.memoryContext for the planner.
  // -------------------------------------------------------------------------
  async function memoryRetriever(state: InvestigationState) {
    if (!store) return { memoryContext: '' };

    const context = await buildMemoryContext(store, state.symptom, state.userId);
    return { memoryContext: context };
  }

  // -------------------------------------------------------------------------
  // Node: planner
  // LLM generates parallel QueryPlan[] informed by symptom + memory context.
  // -------------------------------------------------------------------------
  async function planner(state: InvestigationState) {
    const systemContent =
      state.memoryContext.length > 0
        ? `${plannerSystem}\n\n---\nRelevant past investigations (use these to avoid redundant queries and target likely root causes):\n\n${state.memoryContext}`
        : plannerSystem;

    const reply = await model.invoke([
      new SystemMessage(systemContent),
      new HumanMessage(
        JSON.stringify({ symptom: state.symptom, timeRange: state.timeRange }),
      ),
    ]);
    const plans =
      parseJsonBlock<QueryPlan[]>(extractText(reply.content), z.array(QueryPlanSchema)) ?? [];
    return { plan: plans };
  }

  // -------------------------------------------------------------------------
  // Node: executor
  // Calls MCP tools in parallel with retry. Skips already-executed plans.
  // -------------------------------------------------------------------------
  async function executor(state: InvestigationState) {
    const done = new Set(state.results.map((r) => r.planId));
    const pending = state.plan.filter((p) => !done.has(p.id));
    const results = await Promise.all(
      pending.map((p) => executePlanWithRetry(clients, p)),
    );
    return { results };
  }

  // -------------------------------------------------------------------------
  // Node: verifier
  // LLM classifies results and optionally proposes follow-up queries.
  // -------------------------------------------------------------------------
  async function verifier(state: InvestigationState) {
    const reply = await model.invoke([
      new SystemMessage(VERIFIER_SYSTEM),
      new HumanMessage(JSON.stringify(state.results)),
    ]);
    const parsed = parseJsonBlock<VerifierOutput>(
      extractText(reply.content),
      VerifierOutputSchema,
    );
    const followUps = (parsed?.verdicts ?? [])
      .map((v) => v.followUp)
      .filter((p): p is QueryPlan => p !== undefined && p !== null);
    return {
      plan: followUps,
      iterations: followUps.length > 0 ? 1 : 0,
    };
  }

  // -------------------------------------------------------------------------
  // Node: correlator
  // LLM cross-references results: temporal, causal, and entity correlations.
  // -------------------------------------------------------------------------
  async function correlator(state: InvestigationState) {
    const reply = await model.invoke([
      new SystemMessage(CORRELATOR_SYSTEM),
      new HumanMessage(
        JSON.stringify({ plan: state.plan, results: state.results }),
      ),
    ]);
    const findings =
      parseJsonBlock<Finding[]>(extractText(reply.content), z.array(FindingSchema)) ?? [];
    return { findings };
  }

  // -------------------------------------------------------------------------
  // Node: summarizer
  // LLM produces the final InvestigationReport.
  // -------------------------------------------------------------------------
  async function summarizer(state: InvestigationState) {
    const reply = await model.invoke([
      new SystemMessage(SUMMARIZER_SYSTEM),
      new HumanMessage(
        JSON.stringify({
          symptom: state.symptom,
          plan: state.plan,
          results: state.results,
          findings: state.findings,
          resultCount: state.results.length,
        }),
      ),
    ]);
    return { messages: [reply] };
  }

  // -------------------------------------------------------------------------
  // Node: memorySaver
  // Persists the completed investigation to long-term store for future recall.
  // Runs after summarizer; failures are swallowed so the graph always completes.
  // -------------------------------------------------------------------------
  async function memorySaver(state: InvestigationState) {
    if (!store) return {};
    const durationMs = Date.now() - state.startedAt;
    await saveInvestigation(store, state, durationMs).catch((err) => {
      console.warn('[Investigator] Failed to save investigation to long-term memory:', err);
    });
    return {};
  }

  // -------------------------------------------------------------------------
  // Routing
  // -------------------------------------------------------------------------
  function routeAfterVerifier(state: InvestigationState): 'executor' | 'correlator' {
    const done = new Set(state.results.map((r) => r.planId));
    const hasPending = state.plan.some((p) => !done.has(p.id));
    if (hasPending && state.iterations < maxIterations) return 'executor';
    return 'correlator';
  }

  // -------------------------------------------------------------------------
  // Graph assembly
  // -------------------------------------------------------------------------
  return new StateGraph(InvestigationAnnotation)
    .addNode('memoryRetriever', memoryRetriever)
    .addNode('planner', planner)
    .addNode('executor', executor)
    .addNode('verifier', verifier)
    .addNode('correlator', correlator)
    .addNode('summarizer', summarizer)
    .addNode('memorySaver', memorySaver)
    .addEdge(START, 'memoryRetriever')
    .addEdge('memoryRetriever', 'planner')
    .addEdge('planner', 'executor')
    .addEdge('executor', 'verifier')
    .addConditionalEdges('verifier', routeAfterVerifier, {
      executor: 'executor',
      correlator: 'correlator',
    })
    .addEdge('correlator', 'summarizer')
    .addEdge('summarizer', 'memorySaver')
    .addEdge('memorySaver', END)
    .compile({ checkpointer, store });
}
