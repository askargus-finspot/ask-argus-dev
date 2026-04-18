"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigationAnnotation = void 0;
const langgraph_1 = require("@langchain/langgraph");
function appendList(prev, next) {
    return [...prev, ...next];
}
function addNumber(prev, next) {
    return prev + next;
}
function replaceValue(_prev, next) {
    return next;
}
exports.InvestigationAnnotation = langgraph_1.Annotation.Root({
    /** The symptom or question being investigated. */
    symptom: (0, langgraph_1.Annotation)(),
    /** Optional time window to scope queries. */
    timeRange: (0, langgraph_1.Annotation)(),
    /**
     * Optional user identifier for scoping long-term memory.
     * Investigations from different users are stored in separate namespaces.
     */
    userId: (0, langgraph_1.Annotation)(),
    /**
     * Formatted summary of relevant past investigations injected by memoryRetriever.
     * Consumed by the planner node to produce better initial query plans.
     */
    memoryContext: (0, langgraph_1.Annotation)({ value: replaceValue, default: () => '' }),
    /** Unix ms timestamp captured when the graph run starts. Used to compute durationMs. */
    startedAt: (0, langgraph_1.Annotation)({ value: replaceValue, default: () => Date.now() }),
    plan: (0, langgraph_1.Annotation)({ default: () => [], reducer: appendList }),
    results: (0, langgraph_1.Annotation)({ default: () => [], reducer: appendList }),
    findings: (0, langgraph_1.Annotation)({ default: () => [], reducer: appendList }),
    iterations: (0, langgraph_1.Annotation)({ default: () => 0, reducer: addNumber }),
    messages: (0, langgraph_1.Annotation)({ default: () => [], reducer: langgraph_1.messagesStateReducer }),
});
//# sourceMappingURL=state.js.map