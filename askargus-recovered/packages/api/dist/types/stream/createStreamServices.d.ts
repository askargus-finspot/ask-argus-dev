import type { Redis, Cluster } from 'ioredis';
import type { IJobStore, IEventTransport } from './interfaces/IJobStore';
/**
 * Configuration for stream services (optional overrides)
 */
export interface StreamServicesConfig {
    /**
     * Override Redis detection. If not provided, uses cacheConfig.USE_REDIS.
     */
    useRedis?: boolean;
    /**
     * Override Redis client. If not provided, uses ioredisClient from cache.
     */
    redisClient?: Redis | Cluster | null;
    /**
     * Dedicated Redis client for pub/sub subscribing.
     * If not provided, will duplicate the main client.
     */
    redisSubscriber?: Redis | Cluster | null;
    /**
     * Options for in-memory job store
     */
    inMemoryOptions?: {
        ttlAfterComplete?: number;
        maxJobs?: number;
    };
}
/**
 * Stream services result
 */
export interface StreamServices {
    jobStore: IJobStore;
    eventTransport: IEventTransport;
    isRedis: boolean;
}
/**
 * Create stream services (job store + event transport).
 *
 * Automatically detects Redis from cacheConfig.USE_REDIS_STREAMS and uses
 * the existing ioredisClient. Falls back to in-memory if Redis
 * is not configured or not available.
 *
 * USE_REDIS_STREAMS defaults to USE_REDIS if not explicitly set,
 * allowing users to disable Redis for streams while keeping it for other caches.
 *
 * @example Auto-detect (uses cacheConfig)
 * ```ts
 * const services = createStreamServices();
 * // Uses Redis if USE_REDIS_STREAMS=true (defaults to USE_REDIS), otherwise in-memory
 * ```
 *
 * @example Force in-memory
 * ```ts
 * const services = createStreamServices({ useRedis: false });
 * ```
 */
export declare function createStreamServices(config?: StreamServicesConfig): StreamServices;
//# sourceMappingURL=createStreamServices.d.ts.map