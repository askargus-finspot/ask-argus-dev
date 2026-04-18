import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import type { BaseStore } from '@langchain/langgraph-checkpoint';
import type { MCPClientRegistry } from './mcp';
import type { Finding, MCPToolCatalog, QueryPlan } from './types';
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
export declare function buildInvestigator(deps: InvestigatorDeps): import("@langchain/langgraph").CompiledStateGraph<{
    symptom: string;
    timeRange: import("./types").TimeRange | undefined;
    userId: string | undefined;
    memoryContext: string;
    startedAt: number;
    plan: QueryPlan[];
    results: import("./types").QueryResult[];
    findings: Finding[];
    iterations: number;
    messages: import("@langchain/core/messages").BaseMessage[];
}, {
    symptom?: string | undefined;
    timeRange?: import("./types").TimeRange | undefined;
    userId?: string | undefined;
    memoryContext?: string | undefined;
    startedAt?: number | undefined;
    plan?: QueryPlan[] | undefined;
    results?: import("./types").QueryResult[] | undefined;
    findings?: Finding[] | undefined;
    iterations?: number | undefined;
    messages?: import("@langchain/core/messages").BaseMessage[] | undefined;
}, "executor" | "correlator" | "__start__" | "memoryRetriever" | "planner" | "verifier" | "summarizer" | "memorySaver", {
    symptom: import("@langchain/langgraph").LastValue<string>;
    timeRange: import("@langchain/langgraph").LastValue<import("./types").TimeRange | undefined>;
    userId: import("@langchain/langgraph").LastValue<string | undefined>;
    memoryContext: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    startedAt: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    plan: import("@langchain/langgraph").BinaryOperatorAggregate<QueryPlan[], QueryPlan[]>;
    results: import("@langchain/langgraph").BinaryOperatorAggregate<import("./types").QueryResult[], import("./types").QueryResult[]>;
    findings: import("@langchain/langgraph").BinaryOperatorAggregate<Finding[], Finding[]>;
    iterations: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/core/messages").BaseMessage[]>;
}, {
    symptom: import("@langchain/langgraph").LastValue<string>;
    timeRange: import("@langchain/langgraph").LastValue<import("./types").TimeRange | undefined>;
    userId: import("@langchain/langgraph").LastValue<string | undefined>;
    memoryContext: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    startedAt: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    plan: import("@langchain/langgraph").BinaryOperatorAggregate<QueryPlan[], QueryPlan[]>;
    results: import("@langchain/langgraph").BinaryOperatorAggregate<import("./types").QueryResult[], import("./types").QueryResult[]>;
    findings: import("@langchain/langgraph").BinaryOperatorAggregate<Finding[], Finding[]>;
    iterations: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/core/messages").BaseMessage[]>;
}, import("@langchain/langgraph").StateDefinition, {
    memoryRetriever: {
        memoryContext: string;
    };
    planner: {
        plan: QueryPlan[];
    };
    executor: {
        results: import("./types").QueryResult[];
    };
    verifier: {
        plan: QueryPlan[];
        iterations: number;
    };
    correlator: {
        findings: Finding[];
    };
    summarizer: {
        messages: import("@langchain/core/messages").AIMessageChunk[];
    };
    memorySaver: {};
}>;
