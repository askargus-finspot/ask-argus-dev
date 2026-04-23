declare const cacheConfig: {
    FORCED_IN_MEMORY_CACHE_NAMESPACES: string[];
    USE_REDIS: boolean;
    USE_REDIS_STREAMS: boolean;
    REDIS_URI: string | undefined;
    REDIS_USERNAME: string | undefined;
    REDIS_PASSWORD: string | undefined;
    REDIS_CA: string | null;
    REDIS_KEY_PREFIX: string;
    GLOBAL_PREFIX_SEPARATOR: string;
    REDIS_MAX_LISTENERS: number;
    REDIS_PING_INTERVAL: number;
    /** Max delay between reconnection attempts in ms */
    REDIS_RETRY_MAX_DELAY: number;
    /** Max number of reconnection attempts (0 = infinite) */
    REDIS_RETRY_MAX_ATTEMPTS: number;
    /** Connection timeout in ms */
    REDIS_CONNECT_TIMEOUT: number;
    /** Queue commands when disconnected */
    REDIS_ENABLE_OFFLINE_QUEUE: boolean;
    /** flag to modify redis connection by adding dnsLookup this is required when connecting to elasticache for ioredis
     * see "Special Note: Aws Elasticache Clusters with TLS" on this webpage:  https://www.npmjs.com/package/ioredis **/
    REDIS_USE_ALTERNATIVE_DNS_LOOKUP: boolean;
    /** Enable redis cluster without the need of multiple URIs */
    USE_REDIS_CLUSTER: boolean;
    CI: boolean;
    DEBUG_MEMORY_CACHE: boolean;
    BAN_DURATION: number;
    /**
     * Number of keys to delete in each batch during Redis DEL operations.
     * In cluster mode, keys are deleted individually in parallel chunks to avoid CROSSSLOT errors.
     * In single-node mode, keys are deleted in batches using DEL with arrays.
     * Lower values reduce memory usage but increase number of Redis calls.
     * @default 1000
     */
    REDIS_DELETE_CHUNK_SIZE: number;
    /**
     * Number of keys to update in each batch during Redis SET operations.
     * In cluster mode, keys are updated individually in parallel chunks to avoid CROSSSLOT errors.
     * In single-node mode, keys are updated in batches using transactions (multi/exec).
     * Lower values reduce memory usage but increase number of Redis calls.
     * @default 1000
     */
    REDIS_UPDATE_CHUNK_SIZE: number;
    /**
     * COUNT hint for Redis SCAN operations when scanning keys by pattern.
     * This is a hint to Redis about how many keys to scan in each iteration.
     * Higher values can reduce round trips but increase memory usage and latency per call.
     * Note: Redis may return more or fewer keys than this count depending on internal heuristics.
     * @default 1000
     */
    REDIS_SCAN_COUNT: number;
    /**
     * TTL in milliseconds for MCP registry caches. Used by both:
     * - `MCPServersRegistry` read-through caches (`readThroughCache`/`readThroughCacheAll`)
     * - `ServerConfigsCacheRedisAggregateKey` local snapshot (avoids redundant Redis GETs)
     *
     * Both layers use this value, so the effective max cross-instance staleness is up
     * to 2× this value in multi-instance deployments. Set to 0 to disable the local
     * snapshot entirely (every `getAll()` hits Redis directly).
     * @default 5000 (5 seconds)
     */
    MCP_REGISTRY_CACHE_TTL: number;
};
export { cacheConfig };
//# sourceMappingURL=cacheConfig.d.ts.map