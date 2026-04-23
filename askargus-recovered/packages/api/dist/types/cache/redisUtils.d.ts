import type { RedisClientType, RedisClusterType } from '@redis/client';
/**
 * Efficiently deletes multiple Redis keys with support for both cluster and single-node modes.
 *
 * - Cluster mode: Deletes keys in parallel chunks to avoid CROSSSLOT errors
 * - Single-node mode: Uses batch DEL commands for efficiency
 *
 * @param client - Redis client (node or cluster)
 * @param keys - Array of keys to delete
 * @param chunkSize - Optional chunk size (defaults to REDIS_DELETE_CHUNK_SIZE config)
 * @returns Number of keys deleted
 *
 * @example
 * ```typescript
 * const deletedCount = await batchDeleteKeys(keyvRedisClient, ['key1', 'key2', 'key3']);
 * console.log(`Deleted ${deletedCount} keys`);
 * ```
 */
export declare function batchDeleteKeys(client: RedisClientType | RedisClusterType, keys: string[], chunkSize?: number): Promise<number>;
/**
 * Scans Redis for keys matching a pattern and collects them into an array.
 * Uses Redis SCAN to avoid blocking the server.
 *
 * @param client - Redis client (node or cluster) with scanIterator support
 * @param pattern - Pattern to match keys (e.g., 'user:*', 'session:*:active')
 * @param count - Optional SCAN COUNT hint (defaults to REDIS_SCAN_COUNT config)
 * @returns Array of matching keys
 *
 * @example
 * ```typescript
 * const userKeys = await scanKeys(keyvRedisClient, 'user:*');
 * const sessionKeys = await scanKeys(keyvRedisClient, 'session:*:active', 500);
 * ```
 */
export declare function scanKeys(client: RedisClientType | RedisClusterType, pattern: string, count?: number): Promise<string[]>;
//# sourceMappingURL=redisUtils.d.ts.map