import type { StandardGraph } from '@askargus/agents';
import type { Agents } from 'askargus-data-provider';
import type { SerializableJobData, UsageMetadata, IJobStore, JobStatus } from '~/stream/interfaces/IJobStore';
/**
 * In-memory implementation of IJobStore.
 * Suitable for single-instance deployments.
 * For horizontal scaling, use RedisJobStore.
 *
 * Content state is tied to jobs:
 * - Uses WeakRef to graph for live access to contentParts and contentData (run steps)
 * - No chunk persistence needed - same instance handles generation and reconnects
 */
export declare class InMemoryJobStore implements IJobStore {
    private jobs;
    private contentState;
    private cleanupInterval;
    /** Maps userId -> Set of streamIds (conversationIds) for active jobs */
    private userJobMap;
    /** Time to keep completed jobs before cleanup (0 = immediate) */
    private ttlAfterComplete;
    /** Maximum number of concurrent jobs */
    private maxJobs;
    constructor(options?: {
        ttlAfterComplete?: number;
        maxJobs?: number;
    });
    initialize(): Promise<void>;
    createJob(streamId: string, userId: string, conversationId?: string, tenantId?: string): Promise<SerializableJobData>;
    getJob(streamId: string): Promise<SerializableJobData | null>;
    updateJob(streamId: string, updates: Partial<SerializableJobData>): Promise<void>;
    deleteJob(streamId: string): Promise<void>;
    hasJob(streamId: string): Promise<boolean>;
    getRunningJobs(): Promise<SerializableJobData[]>;
    cleanup(): Promise<number>;
    private evictOldest;
    /** Get job count (for monitoring) */
    getJobCount(): Promise<number>;
    /** Get job count by status (for monitoring) */
    getJobCountByStatus(status: JobStatus): Promise<number>;
    destroy(): Promise<void>;
    /**
     * Get active job IDs for a user.
     * Returns conversation IDs of running jobs belonging to the user.
     * Also performs self-healing cleanup: removes stale entries for jobs that no longer exist.
     */
    getActiveJobIdsByUser(userId: string, tenantId?: string): Promise<string[]>;
    /**
     * Set the graph reference for a job.
     * Uses WeakRef to allow garbage collection when graph is no longer needed.
     */
    setGraph(streamId: string, graph: StandardGraph): void;
    /**
     * Set content parts reference for a job.
     */
    setContentParts(streamId: string, contentParts: Agents.MessageContentComplex[]): void;
    /**
     * Set collected usage reference for a job.
     */
    setCollectedUsage(streamId: string, collectedUsage: UsageMetadata[]): void;
    /**
     * Get collected usage for a job.
     */
    getCollectedUsage(streamId: string): UsageMetadata[];
    /**
     * Get content parts for a job.
     * Returns live content from stored reference.
     */
    getContentParts(streamId: string): Promise<{
        content: Agents.MessageContentComplex[];
    } | null>;
    /**
     * Get run steps for a job from graph.contentData.
     * Uses WeakRef - may return empty if graph has been GC'd.
     */
    getRunSteps(streamId: string): Promise<Agents.RunStep[]>;
    /**
     * No-op for in-memory - content available via graph reference.
     */
    appendChunk(): Promise<void>;
    /**
     * Clear content state for a job.
     */
    clearContentState(streamId: string): void;
}
//# sourceMappingURL=InMemoryJobStore.d.ts.map