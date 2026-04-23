import type { Redis, Cluster } from 'ioredis';
import type { IEventTransport } from '~/stream/interfaces/IJobStore';
/**
 * Redis Pub/Sub implementation of IEventTransport.
 * Enables real-time event delivery across multiple instances.
 *
 * Architecture (inspired by https://upstash.com/blog/resumable-llm-streams):
 * - Publisher: Emits events to Redis channel when chunks arrive
 * - Subscriber: Listens to Redis channel and forwards to SSE clients
 * - Decoupled: Generator and consumer don't need direct connection
 *
 * Note: Requires TWO Redis connections - one for publishing, one for subscribing.
 * This is a Redis limitation: a client in subscribe mode can't publish.
 *
 * @example
 * ```ts
 * const transport = new RedisEventTransport(publisherClient, subscriberClient);
 * transport.subscribe(streamId, { onChunk: (e) => res.write(e) });
 * transport.emitChunk(streamId, { text: 'Hello' });
 * ```
 */
export declare class RedisEventTransport implements IEventTransport {
    /** Redis client for publishing events */
    private publisher;
    /** Redis client for subscribing to events (separate connection required) */
    private subscriber;
    /** Track subscribers per stream */
    private streams;
    /** Track channel subscription state: resolved promise = active, pending = in-flight */
    private channelSubscriptions;
    /** Counter for generating unique subscriber IDs */
    private subscriberIdCounter;
    /** Sequence counters per stream for publishing (ensures ordered delivery in cluster mode) */
    private sequenceCounters;
    /**
     * Create a new Redis event transport.
     *
     * @param publisher - Redis client for publishing (can be shared)
     * @param subscriber - Redis client for subscribing (must be dedicated)
     */
    constructor(publisher: Redis | Cluster, subscriber: Redis | Cluster);
    /** Get next sequence number for a stream (0-indexed) */
    private getNextSequence;
    /** Reset publish sequence counter and subscriber reorder state for a stream (full cleanup only) */
    resetSequence(streamId: string): void;
    /** Advance subscriber reorder buffer to current publisher sequence without resetting publisher (cross-replica safe) */
    syncReorderBuffer(streamId: string): void;
    /**
     * Handle incoming pub/sub message with reordering support for Redis Cluster
     */
    private handleMessage;
    /**
     * Handle terminal events (done/error) with sequence-based ordering.
     * Buffers the terminal event and delivers after all preceding chunks arrive.
     */
    private handleTerminalEvent;
    /**
     * Handle chunk messages with sequence-based reordering.
     * Buffers out-of-order messages and delivers them in sequence.
     */
    private handleOrderedChunk;
    /** Deliver consecutive pending messages */
    private flushPendingMessages;
    /** Force-flush all pending messages in order (used on timeout or overflow) */
    private forceFlushBuffer;
    /** Schedule a timeout to force-flush if gaps aren't filled */
    private scheduleFlushTimeout;
    /** Deliver a message to all handlers */
    private deliverMessage;
    /**
     * Subscribe to events for a stream.
     *
     * On first subscriber for a stream, subscribes to the Redis channel.
     * Returns unsubscribe function that cleans up when last subscriber leaves.
     */
    subscribe(streamId: string, handlers: {
        onChunk: (event: unknown) => void;
        onDone?: (event: unknown) => void;
        onError?: (error: string) => void;
    }): {
        unsubscribe: () => void;
        ready?: Promise<void>;
    };
    /**
     * Publish a chunk event to all subscribers across all instances.
     * Includes sequence number for ordered delivery in Redis Cluster mode.
     */
    emitChunk(streamId: string, event: unknown): Promise<void>;
    /**
     * Publish a done event to all subscribers.
     * Includes sequence number to ensure delivery after all chunks.
     */
    emitDone(streamId: string, event: unknown): Promise<void>;
    /**
     * Publish an error event to all subscribers.
     * Includes sequence number to ensure delivery after all chunks.
     */
    emitError(streamId: string, error: string): Promise<void>;
    /**
     * Get subscriber count for a stream (local instance only).
     *
     * Note: In a multi-instance setup, this only returns local subscriber count.
     * For global count, would need to track in Redis (e.g., with a counter key).
     */
    getSubscriberCount(streamId: string): number;
    /**
     * Check if this is the first subscriber (local instance only).
     */
    isFirstSubscriber(streamId: string): boolean;
    /**
     * Register callback for when all subscribers leave.
     */
    onAllSubscribersLeft(streamId: string, callback: () => void): void;
    /**
     * Publish an abort signal to all replicas.
     * This enables cross-replica abort: when a user aborts on Replica B,
     * the generating Replica A receives the signal and stops.
     */
    emitAbort(streamId: string): void;
    /**
     * Register callback for abort signals from any replica.
     * Called when abort is triggered on any replica (including this one).
     *
     * @param streamId - The stream identifier
     * @param callback - Called when abort signal is received
     */
    onAbort(streamId: string, callback: () => void): void;
    /**
     * Get all tracked stream IDs (for orphan cleanup)
     */
    getTrackedStreamIds(): string[];
    /**
     * Cleanup resources for a specific stream.
     */
    cleanup(streamId: string): void;
    /**
     * Destroy all resources.
     */
    destroy(): void;
}
//# sourceMappingURL=RedisEventTransport.d.ts.map