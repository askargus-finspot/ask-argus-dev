import { ServerConfigsCacheRedisAggregateKey } from './ServerConfigsCacheRedisAggregateKey';
import { ServerConfigsCacheInMemory } from './ServerConfigsCacheInMemory';
import { ServerConfigsCacheRedis } from './ServerConfigsCacheRedis';
export type ServerConfigsCache = ServerConfigsCacheInMemory | ServerConfigsCacheRedis | ServerConfigsCacheRedisAggregateKey;
/**
 * Namespace for YAML-loaded app-level MCP configs. When Redis is enabled, uses a single
 * aggregate key instead of per-server keys to avoid the costly SCAN + batch-GET pattern
 * in {@link ServerConfigsCacheRedis.getAll} that caused 60s+ stalls under concurrent
 * load (see GitHub #11624, #12408). When Redis is disabled, uses in-memory storage.
 */
export declare const APP_CACHE_NAMESPACE: "App";
/** Namespace for admin-defined config-override MCP server inspection results. */
export declare const CONFIG_CACHE_NAMESPACE: "Config";
/**
 * Factory for creating the appropriate ServerConfigsCache implementation based on
 * deployment mode and namespace.
 *
 * Namespaces in {@link AGGREGATE_KEY_NAMESPACES} use {@link ServerConfigsCacheRedisAggregateKey}
 * when Redis is enabled — storing all configs under a single key so `getAll()` is one GET
 * instead of SCAN + N GETs. Cross-instance visibility is preserved: reinspection results
 * propagate through Redis automatically.
 *
 * Other namespaces use the standard {@link ServerConfigsCacheRedis} (per-key storage with
 * SCAN-based enumeration) when Redis is enabled.
 */
export declare class ServerConfigsCacheFactory {
    /**
     * Create a ServerConfigsCache instance.
     *
     * @param namespace - The namespace for the cache. Namespaces in {@link AGGREGATE_KEY_NAMESPACES}
     *   use aggregate-key Redis storage (or in-memory when Redis is disabled).
     * @param leaderOnly - Whether write operations should only be performed by the leader.
     * @returns ServerConfigsCache instance
     */
    static create(namespace: string, leaderOnly: boolean): ServerConfigsCache;
}
//# sourceMappingURL=ServerConfigsCacheFactory.d.ts.map