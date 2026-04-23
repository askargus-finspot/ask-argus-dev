import type { IEventTransport } from '../interfaces/IJobStore';
/**
 * In-memory event transport using Node.js EventEmitter.
 * For horizontal scaling, replace with RedisEventTransport.
 */
export declare class InMemoryEventTransport implements IEventTransport {
    private streams;
    private getOrCreateStream;
    subscribe(streamId: string, handlers: {
        onChunk: (event: unknown) => void;
        onDone?: (event: unknown) => void;
        onError?: (error: string) => void;
    }): {
        unsubscribe: () => void;
        ready?: Promise<void>;
    };
    emitChunk(streamId: string, event: unknown): void;
    emitDone(streamId: string, event: unknown): void;
    emitError(streamId: string, error: string): void;
    getSubscriberCount(streamId: string): number;
    onAllSubscribersLeft(streamId: string, callback: () => void): void;
    /**
     * Check if this is the first subscriber (for ready signaling)
     */
    isFirstSubscriber(streamId: string): boolean;
    /**
     * Cleanup a stream's event emitter
     */
    cleanup(streamId: string): void;
    /**
     * Get count of tracked streams (for monitoring)
     */
    getStreamCount(): number;
    /**
     * Get all tracked stream IDs (for orphan cleanup)
     */
    getTrackedStreamIds(): string[];
    destroy(): void;
}
//# sourceMappingURL=InMemoryEventTransport.d.ts.map