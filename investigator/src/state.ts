import type { BaseMessage } from '@langchain/core/messages';

import { Annotation, messagesStateReducer } from '@langchain/langgraph';

import type { Finding, QueryPlan, QueryResult, TimeRange } from './types';

function appendList<T>(prev: T[], next: T[]): T[] {
  return [...prev, ...next];
}

function addNumber(prev: number, next: number): number {
  return prev + next;
}

function replaceValue<T>(_prev: T, next: T): T {
  return next;
}

export const InvestigationAnnotation = Annotation.Root({
  /** The symptom or question being investigated. */
  symptom: Annotation<string>(),
  /** Optional time window to scope queries. */
  timeRange: Annotation<TimeRange | undefined>(),
  /**
   * Optional user identifier for scoping long-term memory.
   * Investigations from different users are stored in separate namespaces.
   */
  userId: Annotation<string | undefined>(),
  /**
   * Formatted summary of relevant past investigations injected by memoryRetriever.
   * Consumed by the planner node to produce better initial query plans.
   */
  memoryContext: Annotation<string>({ value: replaceValue, default: () => '' }),
  /** Unix ms timestamp captured when the graph run starts. Used to compute durationMs. */
  startedAt: Annotation<number>({ value: replaceValue, default: () => Date.now() }),
  plan: Annotation<QueryPlan[]>({ default: () => [], reducer: appendList }),
  results: Annotation<QueryResult[]>({ default: () => [], reducer: appendList }),
  findings: Annotation<Finding[]>({ default: () => [], reducer: appendList }),
  iterations: Annotation<number>({ default: () => 0, reducer: addNumber }),
  messages: Annotation<BaseMessage[]>({ default: () => [], reducer: messagesStateReducer }),
});

export type InvestigationState = typeof InvestigationAnnotation.State;
