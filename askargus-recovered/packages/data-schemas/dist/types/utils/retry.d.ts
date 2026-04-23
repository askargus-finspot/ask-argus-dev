interface RetryOptions {
    maxAttempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    jitter?: boolean;
    retryableErrors?: string[];
    onRetry?: (error: Error, attempt: number, delayMs: number) => void;
}
/**
 * Executes an async operation with exponential backoff + jitter retry
 * on transient errors (deadlocks, connection resets, lock timeouts).
 *
 * Designed for FerretDB/DocumentDB operations where concurrent index
 * creation or bulk writes can trigger PostgreSQL-level deadlocks.
 */
export declare function retryWithBackoff<T>(operation: () => Promise<T>, label: string, options?: RetryOptions): Promise<T | undefined>;
/**
 * Creates all indexes for a Mongoose model with deadlock retry.
 * Use this instead of raw `model.createIndexes()` on FerretDB.
 */
export declare function createIndexesWithRetry(model: {
    createIndexes: () => Promise<unknown>;
    modelName: string;
}, options?: RetryOptions): Promise<void>;
/**
 * Initializes all collections and indexes for a set of models on a connection,
 * with per-model deadlock retry. Models are processed sequentially to minimize
 * contention on the DocumentDB catalog.
 */
export declare function initializeOrgCollections(models: Record<string, {
    createCollection: () => Promise<unknown>;
    createIndexes: () => Promise<unknown>;
    modelName: string;
}>, options?: RetryOptions): Promise<{
    totalMs: number;
    perModel: Array<{
        name: string;
        ms: number;
    }>;
}>;
export {};
