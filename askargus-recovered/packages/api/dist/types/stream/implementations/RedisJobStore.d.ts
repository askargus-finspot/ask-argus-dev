import type { StandardGraph } from '@askargus/agents';
import type { Agents } from 'askargus-data-provider';
import type { Redis, Cluster } from 'ioredis';
import type { SerializableJobData, UsageMetadata, IJobStore, JobStatus } from '~/stream/interfaces/IJobStore';
/**
 * Redis implementation of IJobStore.
 * Enables horizontal scaling with multi-instance deployments.
 *
 * Storage strategy:
 * - Job metadata: Redis Hash (fast field access)
 * - Chunks: Redis Streams (append-only, efficient for streaming)
 * - Run steps: Redis String (JSON serialized)
 *
 * Note: streamId === conversationId, so getJob(conversationId) works directly.
 *
 * @example
 * ```ts
 * import { ioredisClient } from '~/cache';
 * const store = new RedisJobStore(ioredisClient);
 * await store.initialize();
 * ```
 */
/**
 * Configuration options for RedisJobStore
 */
export interface RedisJobStoreOptions {
    /** TTL for completed jobs in seconds (default: 300 = 5 minutes) */
    completedTtl?: number;
    /** TTL for running jobs/chunks in seconds (default: 1200 = 20 minutes) */
    runningTtl?: number;
    /** TTL for chunks after completion in seconds (default: 0 = delete immediately) */
    chunksAfterCompleteTtl?: number;
    /** TTL for run steps after completion in seconds (default: 0 = delete immediately) */
    runStepsAfterCompleteTtl?: number;
}
export declare class RedisJobStore implements IJobStore {
    private redis;
    private cleanupInterval;
    private ttl;
    /** Whether Redis client is in cluster mode (affects pipeline usage) */
    private isCluster;
    /**
     * Local cache for graph references on THIS instance.
     * Enables fast reconnects when client returns to the same server.
     * Uses WeakRef to allow garbage collection when graph is no longer needed.
     */
    private localGraphCache;
    /**
     * Local cache for collectedUsage arrays.
     * Generation happens on a single instance, so collectedUsage is only available locally.
     * For cross-replica abort, the abort handler falls back to text-based token counting.
     */
    private localCollectedUsageCache;
    /** Cleanup interval in ms (1 minute) */
    private cleanupIntervalMs;
    constructor(redis: Redis | Cluster, options?: RedisJobStoreOptions);
    initialize(): Promise<void>;
    createJob(streamId: string, userId: string, conversationId?: string, tenantId?: string): Promise<SerializableJobData>;
    getJob(streamId: string): Promise<SerializableJobData | null>;
    updateJob(streamId: string, updates: Partial<SerializableJobData>): Promise<void>;
    deleteJob(streamId: string): Promise<void>;
    hasJob(streamId: string): Promise<boolean>;
    getRunningJobs(): Promise<SerializableJobData[]>;
    cleanup(): Promise<number>;
    getJobCount(): Promise<number>;
    getJobCountByStatus(status: JobStatus): Promise<number>;
    /**
     * Get active job IDs for a user.
     * Returns conversation IDs of running jobs belonging to the user.
     * Also performs self-healing cleanup: removes stale entries for jobs that no longer exist.
     *
     * @param userId - The user ID to query
     * @returns Array of conversation IDs with active jobs
     */
    getActiveJobIdsByUser(userId: string, tenantId?: string): Promise<string[]>;
    destroy(): Promise<void>;
    /**
     * Store graph reference in local cache.
     * This enables fast reconnects when client returns to the same instance.
     * Falls back to Redis chunk reconstruction for cross-instance reconnects.
     *
     * @param streamId - The stream identifier
     * @param graph - The graph instance (stored as WeakRef)
     */
    setGraph(streamId: string, graph: StandardGraph): void;
    /**
     * No-op for Redis - content parts are reconstructed from chunks.
     * Metadata (agentId, groupId) is embedded directly on content parts by the agent runtime.
     */
    setContentParts(): void;
    /**
     * Store collectedUsage reference in local cache.
     * This is used for abort handling to spend tokens for all models.
     * Note: Only available on the generating instance; cross-replica abort uses fallback.
     */
    setCollectedUsage(streamId: string, collectedUsage: UsageMetadata[]): void;
    /**
     * Get collected usage for a job.
     * Only available if this is the generating instance.
     */
    getCollectedUsage(streamId: string): UsageMetadata[];
    /**
     * Get aggregated content - tries local cache first, falls back to Redis reconstruction.
     *
     * Optimization: If this instance has the live graph (same-instance reconnect),
     * we return the content directly without Redis round-trip.
     * For cross-instance reconnects, we reconstruct from Redis Streams.
     *
     * @param streamId - The stream identifier
     * @returns Content parts array or null if not found
     */
    getContentParts(streamId: string): Promise<{
        content: Agents.MessageContentComplex[];
    } | null>;
    /**
     * Get run steps - tries local cache first, falls back to Redis.
     *
     * Optimization: If this instance has the live graph, we get run steps
     * directly without Redis round-trip.
     *
     * @param streamId - The stream identifier
     * @returns Run steps array
     */
    getRunSteps(streamId: string): Promise<Agents.RunStep[]>;
    /**
     * Clear content state for a job.
     * Removes both local cache and Redis data.
     */
    clearContentState(streamId: string): void;
    /**
     * Clear content state async.
     */
    private clearContentStateAsync;
    /**
     * Append a streaming chunk to Redis Stream.
     * Uses XADD for efficient append-only storage.
     * Sets TTL on first chunk to ensure cleanup if job crashes.
     */
    appendChunk(streamId: string, event: unknown): Promise<void>;
    /**
     * Get all chunks from Redis Stream.
     */
    private getChunks;
    /**
     * Save run steps for resume state.
     */
    saveRunSteps(streamId: string, runSteps: Agents.RunStep[]): Promise<void>;
    /**
     * Create a consumer group for a stream.
     * Used to track which chunks a client has already received.
     *
     * @param streamId - The stream identifier
     * @param groupName - Unique name for the consumer group (e.g., session ID)
     * @param startFrom - Where to start reading ('0' = from beginning, '$' = only new)
     */
    createConsumerGroup(streamId: string, groupName: string, startFrom?: '0' | '$'): Promise<void>;
    /**
     * Read chunks from a consumer group (only unseen chunks).
     * This is the key to the resumable stream pattern.
     *
     * @param streamId - The stream identifier
     * @param groupName - Consumer group name
     * @param consumerName - Name of the consumer within the group
     * @param count - Maximum number of chunks to read (default: all available)
     * @returns Array of { id, event } where id is the Redis stream entry ID
     */
    readChunksFromGroup(streamId: string, groupName: string, consumerName?: string, count?: number): Promise<Array<{
        id: string;
        event: unknown;
    }>>;
    /**
     * Acknowledge that chunks have been processed.
     * This tells Redis we've successfully delivered these chunks to the client.
     *
     * @param streamId - The stream identifier
     * @param groupName - Consumer group name
     * @param messageIds - Array of Redis stream entry IDs to acknowledge
     */
    acknowledgeChunks(streamId: string, groupName: string, messageIds: string[]): Promise<void>;
    /**
     * Delete a consumer group.
     * Called when a client disconnects and won't reconnect.
     *
     * @param streamId - The stream identifier
     * @param groupName - Consumer group name to delete
     */
    deleteConsumerGroup(streamId: string, groupName: string): Promise<void>;
    /**
     * Get pending chunks for a consumer (chunks delivered but not acknowledged).
     * Useful for recovering from crashes.
     *
     * @param streamId - The stream identifier
     * @param groupName - Consumer group name
     * @param consumerName - Consumer name
     */
    getPendingChunks(streamId: string, groupName: string, consumerName?: string): Promise<Array<{
        id: string;
        event: unknown;
    }>>;
    /**
     * Serialize job data for Redis hash storage.
     * Converts complex types to strings.
     */
    private serializeJob;
    /**
     * Deserialize job data from Redis hash.
     */
    private deserializeJob;
}
//# sourceMappingURL=RedisJobStore.d.ts.map