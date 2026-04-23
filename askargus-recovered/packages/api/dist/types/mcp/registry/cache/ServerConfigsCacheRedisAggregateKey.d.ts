import type Keyv from 'keyv';
import type { IServerConfigsRepositoryInterface } from '~/mcp/registry/ServerConfigsRepositoryInterface';
import type { ParsedServerConfig, AddServerResult } from '~/mcp/types';
import { BaseRegistryCache } from './BaseRegistryCache';
export declare class ServerConfigsCacheRedisAggregateKey extends BaseRegistryCache implements IServerConfigsRepositoryInterface {
    protected readonly cache: Keyv;
    private writeLock;
    /**
     * In-memory snapshot of the aggregate key to avoid redundant Redis GETs.
     * `getAll()` is called 20+ times per chat request (once per tool, per server
     * config lookup, per connection check) but the data doesn't change within a
     * request cycle. The snapshot collapses all reads within the TTL window into
     * a single Redis GET. Invalidated on every write (`add`, `update`, `remove`, `reset`).
     *
     * NOTE: In multi-instance deployments, the effective max staleness for cross-instance
     * writes is up to 2×MCP_REGISTRY_CACHE_TTL. This happens when readThroughCacheAll
     * (MCPServersRegistry) is populated from a snapshot that is nearly expired. For the
     * default 5000ms TTL, worst-case cross-instance propagation is ~10s. This is acceptable
     * given the single-writer invariant (leader-only initialization, rare manual reinspection).
     */
    private localSnapshot;
    /** Milliseconds since epoch. 0 = epoch = always expired on first check. */
    private localSnapshotExpiry;
    private readonly namespace;
    constructor(namespace: string, leaderOnly: boolean);
    private invalidateLocalSnapshot;
    /**
     * Serializes write operations to prevent concurrent read-modify-write races.
     * Reads (`get`, `getAll`) are not serialized — they can run concurrently.
     * Always invalidates the local snapshot in `finally` to guarantee cleanup
     * even when the write callback throws (e.g., Redis SET failure).
     */
    private withWriteLock;
    getAll(): Promise<Record<string, ParsedServerConfig>>;
    get(serverName: string): Promise<ParsedServerConfig | undefined>;
    add(serverName: string, config: ParsedServerConfig): Promise<AddServerResult>;
    update(serverName: string, config: ParsedServerConfig): Promise<void>;
    upsert(serverName: string, config: ParsedServerConfig): Promise<void>;
    remove(serverName: string): Promise<void>;
    /**
     * Resets the aggregate key directly instead of using SCAN-based `cache.clear()`.
     * Only one key (`__all__`) ever exists in this namespace, so a targeted delete is
     * more efficient and consistent with the PR's goal of eliminating SCAN operations.
     *
     * NOTE: Intentionally not serialized via `withWriteLock`. `reset()` is only called
     * during lifecycle transitions (test teardown, full reinitialization via
     * `MCPServersInitializer`) where no concurrent writes are in flight.
     */
    reset(): Promise<void>;
}
//# sourceMappingURL=ServerConfigsCacheRedisAggregateKey.d.ts.map