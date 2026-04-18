import type { BaseMessage } from '@langchain/core/messages';
import type { Finding, QueryPlan, QueryResult, TimeRange } from './types';
export declare const InvestigationAnnotation: import("@langchain/langgraph").AnnotationRoot<{
    /** The symptom or question being investigated. */
    symptom: import("@langchain/langgraph").LastValue<string>;
    /** Optional time window to scope queries. */
    timeRange: import("@langchain/langgraph").LastValue<TimeRange | undefined>;
    /**
     * Optional user identifier for scoping long-term memory.
     * Investigations from different users are stored in separate namespaces.
     */
    userId: import("@langchain/langgraph").LastValue<string | undefined>;
    /**
     * Formatted summary of relevant past investigations injected by memoryRetriever.
     * Consumed by the planner node to produce better initial query plans.
     */
    memoryContext: import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
    /** Unix ms timestamp captured when the graph run starts. Used to compute durationMs. */
    startedAt: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    plan: import("@langchain/langgraph").BinaryOperatorAggregate<QueryPlan[], QueryPlan[]>;
    results: import("@langchain/langgraph").BinaryOperatorAggregate<QueryResult[], QueryResult[]>;
    findings: import("@langchain/langgraph").BinaryOperatorAggregate<Finding[], Finding[]>;
    iterations: import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<BaseMessage[], BaseMessage[]>;
}>;
export type InvestigationState = typeof InvestigationAnnotation.State;
