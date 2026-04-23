import type { StandardGraph } from '@askargus/agents';
import type { Agents } from 'askargus-data-provider';
import type { IEventTransport, UsageMetadata, AbortResult, IJobStore } from './interfaces/IJobStore';
import type * as t from '~/types';
/**
 * Configuration options for GenerationJobManager
 */
export interface GenerationJobManagerOptions {
    jobStore?: IJobStore;
    eventTransport?: IEventTransport;
    /**
     * If true, cleans up event transport immediately when job completes.
     * If false, keeps EventEmitters until periodic cleanup for late reconnections.
     * Default: true (immediate cleanup to save memory)
     */
    cleanupOnComplete?: boolean;
}
/**
 * Manages generation jobs for resumable LLM streams.
 *
 * Architecture: Composes two pluggable services via dependency injection:
 * - jobStore: Job metadata + content state (InMemory → Redis for horizontal scaling)
 * - eventTransport: Pub/sub events (InMemory → Redis Pub/Sub for horizontal scaling)
 *
 * Content state is tied to jobs:
 * - In-memory: jobStore holds WeakRef to graph for live content/run steps access
 * - Redis: jobStore persists chunks, reconstructs content on demand
 *
 * All storage methods are async to support both in-memory and external stores (Redis, etc.).
 *
 * @example Redis injection:
 * ```ts
 * const manager = new GenerationJobManagerClass({
 *   jobStore: new RedisJobStore(redisClient),
 *   eventTransport: new RedisPubSubTransport(redisClient),
 * });
 * ```
 */
declare class GenerationJobManagerClass {
    /** Job metadata + content state storage - swappable for Redis, etc. */
    private jobStore;
    /** Event pub/sub transport - swappable for Redis Pub/Sub, etc. */
    private eventTransport;
    /** Runtime state - always in-memory, not serializable */
    private runtimeState;
    private cleanupInterval;
    /** Whether we're using Redis stores */
    private _isRedis;
    /** Whether to cleanup event transport immediately on job completion */
    private _cleanupOnComplete;
    constructor(options?: GenerationJobManagerOptions);
    /**
     * Initialize the job manager with periodic cleanup.
     * Call this once at application startup.
     */
    initialize(): void;
    /**
     * Configure the manager with custom stores.
     * Call this BEFORE initialize() to use Redis or other stores.
     *
     * @example Using Redis
     * ```ts
     * import { createStreamServicesFromCache } from '~/stream/createStreamServices';
     * import { cacheConfig, ioredisClient } from '~/cache';
     *
     * const services = createStreamServicesFromCache({ cacheConfig, ioredisClient });
     * GenerationJobManager.configure(services);
     * GenerationJobManager.initialize();
     * ```
     */
    configure(services: {
        jobStore: IJobStore;
        eventTransport: IEventTransport;
        isRedis?: boolean;
        cleanupOnComplete?: boolean;
    }): void;
    /**
     * Check if using Redis stores.
     */
    get isRedis(): boolean;
    /**
     * Get the job store instance (for advanced use cases).
     */
    getJobStore(): IJobStore;
    /**
     * Create a new generation job.
     *
     * This sets up:
     * 1. Serializable job data in the job store
     * 2. Runtime state including readyPromise (resolves when first SSE client connects)
     * 3. allSubscribersLeft callback for handling client disconnections
     *
     * The readyPromise mechanism ensures generation doesn't start before the client
     * is ready to receive events. The controller awaits this promise (with a short timeout)
     * before starting LLM generation.
     *
     * @param streamId - Unique identifier for this stream
     * @param userId - User who initiated the request
     * @param conversationId - Optional conversation ID for lookup
     * @returns A facade object for the GenerationJob
     */
    createJob(streamId: string, userId: string, conversationId?: string): Promise<t.GenerationJob>;
    /**
     * Build a GenerationJob facade from composed services.
     *
     * This facade provides a unified API (job.emitter, job.abortController, etc.)
     * while internally delegating to the injected services (jobStore, eventTransport,
     * contentState). This allows swapping implementations (e.g., Redis) without
     * changing consumer code.
     *
     * IMPORTANT: The emitterProxy.on('allSubscribersLeft') handler registration
     * does NOT use eventTransport.subscribe(). This is intentional:
     *
     * If we used subscribe() for internal handlers, those handlers would count
     * as subscribers. When the real SSE client connects, isFirstSubscriber()
     * would return false (because internal handler was "first"), and readyPromise
     * would never resolve - causing a 5-second timeout delay before generation starts.
     *
     * Instead, allSubscribersLeft handlers are stored in runtime.allSubscribersLeftHandlers
     * and called directly from the onAllSubscribersLeft callback in createJob().
     *
     * @param streamId - The stream identifier
     * @param jobData - Serializable job metadata from job store
     * @param runtime - Non-serializable runtime state (abort controller, promises, etc.)
     * @returns A GenerationJob facade object
     */
    private buildJobFacade;
    /**
     * Get or create runtime state for a job.
     *
     * This enables cross-replica support in Redis mode:
     * - If runtime exists locally (same replica), return it
     * - If job exists in Redis but not locally (cross-replica), create minimal runtime
     *
     * The lazily-created runtime state is sufficient for:
     * - Subscribing to events (via Redis pub/sub)
     * - Getting resume state
     * - Handling reconnections
     * - Receiving cross-replica abort signals (via Redis pub/sub)
     *
     * @param streamId - The stream identifier
     * @returns Runtime state or null if job doesn't exist anywhere
     */
    private getOrCreateRuntimeState;
    /**
     * Get a job by streamId.
     */
    getJob(streamId: string): Promise<t.GenerationJob | undefined>;
    /**
     * Check if a job exists.
     */
    hasJob(streamId: string): Promise<boolean>;
    /**
     * Get job status.
     */
    getJobStatus(streamId: string): Promise<t.GenerationJobStatus | undefined>;
    /**
     * Mark job as complete.
     * If cleanupOnComplete is true (default), immediately cleans up job resources.
     * Exception: Jobs with errors are NOT immediately deleted to allow late-connecting
     * clients to receive the error (race condition where error occurs before client connects).
     * Note: eventTransport is NOT cleaned up here to allow the final event to be
     * fully transmitted. It will be cleaned up when subscribers disconnect or
     * by the periodic cleanup job.
     */
    completeJob(streamId: string, error?: string): Promise<void>;
    /**
     * Abort a job (user-initiated).
     * Returns all data needed for token spending and message saving.
     *
     * Cross-replica support (Redis mode):
     * - Emits abort signal via Redis pub/sub
     * - The replica running generation receives signal and aborts its AbortController
     */
    abortJob(streamId: string): Promise<AbortResult>;
    /**
     * Subscribe to a job's event stream.
     *
     * This is called when an SSE client connects to /chat/stream/:streamId.
     * On first subscription:
     * - Resolves readyPromise (legacy, for API compatibility)
     * - Replays any buffered early events (e.g., 'created' event)
     *
     * Supports cross-replica reconnection in Redis mode:
     * - If job exists in Redis but not locally, creates minimal runtime state
     * - Events are delivered via Redis pub/sub, not in-memory EventEmitter
     *
     * @param streamId - The stream to subscribe to
     * @param onChunk - Handler for chunk events (streamed tokens, run steps, etc.)
     * @param onDone - Handler for completion event (includes final message)
     * @param onError - Handler for error events
     * @param options - Subscription configuration
     * @param options.skipBufferReplay - When true, skips replaying the earlyEventBuffer.
     *   Use this when a sync event was already sent (resume), since the sync's
     *   aggregatedContent already includes all buffered events.
     * @returns Subscription object with unsubscribe function, or null if job not found
     */
    subscribe(streamId: string, onChunk: t.ChunkHandler, onDone?: t.DoneHandler, onError?: t.ErrorHandler, options?: t.SubscribeOptions): Promise<{
        unsubscribe: t.UnsubscribeFn;
    } | null>;
    /**
     * Atomic resume + subscribe: snapshots resume state and drains the early event buffer
     * in one synchronous step, then subscribes with skipBufferReplay.
     *
     * Closes the timing gap between separate `getResumeState()` and `subscribe()` calls
     * where events could arrive in earlyEventBuffer after the snapshot but before subscribe
     * clears the buffer.
     *
     * In-memory mode: drained buffer events are returned as `pendingEvents` since
     * they exist nowhere else. The caller must deliver them after the sync payload.
     * Redis mode: `pendingEvents` is empty — chunks are persisted via appendChunk
     * and will appear in aggregatedContent on the next resume.
     */
    subscribeWithResume(streamId: string, onChunk: t.ChunkHandler, onDone?: t.DoneHandler, onError?: t.ErrorHandler): Promise<t.SubscribeWithResumeResult>;
    /**
     * Emit a chunk event to all subscribers.
     * Uses runtime state check for performance (avoids async job store lookup per token).
     *
     * If no subscriber has connected yet, buffers the event for replay when they do.
     * This ensures early events (like 'created') aren't lost due to race conditions.
     *
     * In Redis mode, awaits the publish to guarantee event ordering.
     * This is critical for streaming deltas (tool args, message content) to arrive in order.
     */
    emitChunk(streamId: string, event: t.ServerSentEvent): Promise<void>;
    /**
     * Extract and save run step from event data.
     * The data is already the run step object from the event payload.
     */
    private saveRunStepFromEvent;
    /**
     * Accumulate run steps for a stream (Redis mode only).
     * Uses a simple in-memory buffer that gets flushed to Redis.
     * Not used in in-memory mode - run steps come from live graph via WeakRef.
     */
    private runStepBuffers;
    private accumulateRunStep;
    /**
     * Persist user message metadata from the created event.
     * Awaited in emitChunk so the HSET commits before the PUBLISH,
     * guaranteeing any cross-replica getJob() after the pub/sub window
     * finds userMessage in Redis.
     */
    private trackUserMessage;
    /**
     * Update job metadata.
     */
    updateMetadata(streamId: string, metadata: Partial<t.GenerationJobMetadata>): Promise<void>;
    /**
     * Set reference to the graph's contentParts array.
     */
    setContentParts(streamId: string, contentParts: Agents.MessageContentComplex[]): void;
    /**
     * Set reference to the collectedUsage array.
     * This array accumulates token usage from all models during generation.
     */
    setCollectedUsage(streamId: string, collectedUsage: UsageMetadata[]): void;
    /**
     * Set reference to the graph instance.
     */
    setGraph(streamId: string, graph: StandardGraph): void;
    /**
     * Get resume state for reconnecting clients.
     */
    getResumeState(streamId: string): Promise<t.ResumeState | null>;
    /**
     * Mark that sync has been sent.
     * Persists to Redis for cross-replica consistency.
     */
    markSyncSent(streamId: string): void;
    /**
     * Check if sync has been sent.
     * Checks local runtime first, then falls back to Redis for cross-replica scenarios.
     */
    wasSyncSent(streamId: string): Promise<boolean>;
    /**
     * Emit a done event.
     * Persists finalEvent to Redis for cross-replica access.
     */
    emitDone(streamId: string, event: t.ServerSentEvent): Promise<void>;
    /**
     * Emit an error event.
     * Stores the error for late-connecting subscribers (race condition where error
     * occurs before client connects to SSE stream).
     */
    emitError(streamId: string, error: string): Promise<void>;
    /**
     * Cleanup expired jobs.
     * Also cleans up any orphaned runtime state, buffers, and event transport entries.
     */
    private cleanup;
    /**
     * Get stream info for status endpoint.
     */
    getStreamInfo(streamId: string): Promise<{
        active: boolean;
        status: t.GenerationJobStatus;
        aggregatedContent?: Agents.MessageContentComplex[];
        createdAt: number;
    } | null>;
    /**
     * Get total job count.
     */
    getJobCount(): Promise<number>;
    /** Returns sizes of internal runtime maps for diagnostics */
    getRuntimeStats(): {
        runtimeStateSize: number;
        runStepBufferSize: number;
        eventTransportStreams: number;
    };
    /**
     * Get job count by status.
     */
    getJobCountByStatus(): Promise<Record<t.GenerationJobStatus, number>>;
    /**
     * Get active job IDs for a user.
     * Returns conversation IDs of running jobs belonging to the user.
     * Performs self-healing cleanup of stale entries.
     *
     * @param userId - The user ID to query
     * @returns Array of conversation IDs with active jobs
     */
    getActiveJobIdsForUser(userId: string, tenantId?: string): Promise<string[]>;
    /**
     * Destroy the manager.
     * Cleans up all resources including runtime state, buffers, and stores.
     */
    destroy(): Promise<void>;
}
export declare const GenerationJobManager: GenerationJobManagerClass;
export { GenerationJobManagerClass };
//# sourceMappingURL=GenerationJobManager.d.ts.map