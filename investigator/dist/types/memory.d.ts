import type { MongoClient } from 'mongodb';
import { BaseStore, type Operation, type OperationResults } from '@langchain/langgraph-checkpoint';
import type { InvestigationState } from './state';
import type { Finding } from './types';
/**
 * A LangGraph-compatible BaseStore backed by MongoDB.
 *
 * Supports:
 *  - put / get / delete / search / listNamespaces
 *  - Full-text search on `value.symptom`, `value.summary`, `value.claim`
 *  - Namespace-scoped queries for multi-user isolation
 *
 * @example
 * ```typescript
 * const store = new MongoDBInvestigationStore(mongoClient);
 * await store.start(); // creates indexes once
 *
 * const graph = buildInvestigator({ model, clients, store });
 * ```
 */
export declare class MongoDBInvestigationStore extends BaseStore {
    private readonly col;
    constructor(client: MongoClient, dbName?: string, collectionName?: string);
    /** Call once on startup to create MongoDB indexes. */
    start(): Promise<void>;
    stop(): Promise<void>;
    batch<Op extends Operation[]>(operations: Op): Promise<OperationResults<Op>>;
    private _dispatch;
    private _put;
    private _get;
    private _search;
    private _listNamespaces;
}
export interface StoredInvestigationValue {
    symptom: string;
    summary: string;
    findings: Finding[];
    queriesExecuted: number;
    durationMs: number;
    userId?: string;
}
/** Namespace for long-term investigation memory, scoped per user (or 'global'). */
export declare function investigationNamespace(userId?: string): string[];
/**
 * Saves a completed investigation to the long-term store.
 * Called by the memorySaver node.
 */
export declare function saveInvestigation(store: BaseStore, state: InvestigationState, durationMs: number): Promise<void>;
/**
 * Searches long-term store for past investigations similar to the given symptom.
 * Returns a formatted string injected into the planner's context.
 */
export declare function buildMemoryContext(store: BaseStore, symptom: string, userId?: string, limit?: number): Promise<string>;
