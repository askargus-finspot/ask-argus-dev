/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type * as t from '~/mcp/types';
/**
 * Central registry for managing MCP server configurations.
 * Authoritative source of truth for all MCP servers provided by AskArgus.
 *
 * Uses a three-layer architecture:
 * - YAML Cache (cacheConfigsRepo): Operator-defined configs loaded at startup (in-memory or Redis)
 * - Config Cache (configCacheRepo): Admin-defined configs from Config overrides, lazily initialized
 * - DB Repository (dbConfigsRepo): User-provided configs created at runtime (MongoDB + ACL)
 *
 * Query priority: YAML cache → Config cache → DB.
 */
export declare class MCPServersRegistry {
    private static instance;
    private readonly dbConfigsRepo;
    private readonly cacheConfigsRepo;
    private readonly configCacheRepo;
    private readonly allowedDomains?;
    private readonly readThroughCache;
    private readonly readThroughCacheAll;
    private readonly pendingGetAllPromises;
    /** Tracks in-flight config server initializations to prevent duplicate work. */
    private readonly pendingConfigInits;
    /** Memoized YAML server names — set once after boot-time init, never changes. */
    private yamlServerNames;
    private yamlServerNamesPromise;
    constructor(mongoose: typeof import('mongoose'), allowedDomains?: string[] | null);
    /** Creates and initializes the singleton MCPServersRegistry instance */
    static createInstance(mongoose: typeof import('mongoose'), allowedDomains?: string[] | null): MCPServersRegistry;
    /** Returns the singleton MCPServersRegistry instance */
    static getInstance(): MCPServersRegistry;
    getAllowedDomains(): string[] | null | undefined;
    /** Returns true when no explicit allowedDomains allowlist is configured, enabling SSRF TOCTOU protection */
    shouldEnableSSRFProtection(): boolean;
    /**
     * Returns the config for a single server. When `configServers` is provided, config-source
     * servers are resolved from it directly (no global state, no cross-tenant race).
     */
    getServerConfig(serverName: string, userId?: string, configServers?: Record<string, t.ParsedServerConfig>): Promise<t.ParsedServerConfig | undefined>;
    /**
     * Returns all server configs visible to the given user.
     * YAML and Config tiers are mutually exclusive by design (`ensureConfigServers` filters
     * YAML names), so the spread order only matters for User DB (highest priority) overriding both.
     */
    getAllServerConfigs(userId?: string, configServers?: Record<string, t.ParsedServerConfig>): Promise<Record<string, t.ParsedServerConfig>>;
    /**
     * Returns YAML + user-DB server configs, cached via `readThroughCacheAll`.
     * Always called by `getAllServerConfigs` so the DB query is amortized across
     * requests within the TTL window regardless of whether `configServers` is present.
     */
    private getBaseServerConfigs;
    private fetchBaseServerConfigs;
    /**
     * Stores a minimal config stub so the server remains "known" to the registry
     * even when inspection fails at startup. This enables reinitialize to recover.
     */
    addServerStub(serverName: string, config: t.MCPOptions, storageLocation: 'CACHE' | 'DB', userId?: string): Promise<t.AddServerResult>;
    addServer(serverName: string, config: t.MCPOptions, storageLocation: 'CACHE' | 'DB', userId?: string): Promise<t.AddServerResult>;
    /**
     * Re-inspects a server that previously failed initialization.
     * Uses the stored stub config to attempt a full inspection and replaces the stub on success.
     */
    reinspectServer(serverName: string, storageLocation: 'CACHE' | 'DB', userId?: string): Promise<t.AddServerResult>;
    updateServer(serverName: string, config: t.MCPOptions, storageLocation: 'CACHE' | 'DB', userId?: string): Promise<t.ParsedServerConfig>;
    /**
     * Ensures that config-source MCP servers (from admin Config overrides) are initialized.
     * Identifies servers in `resolvedMcpConfig` that are not from YAML, lazily initializes
     * any not yet in the config cache, and returns their parsed configs.
     *
     * Config cache keys are scoped by a hash of the raw config to prevent cross-tenant
     * cache poisoning when two tenants define a server with the same name but different configs.
     */
    ensureConfigServers(resolvedMcpConfig: Record<string, t.MCPOptions>): Promise<Record<string, t.ParsedServerConfig>>;
    /**
     * Ensures a single config-source server is initialized.
     * Cache key is scoped by config hash to prevent cross-tenant poisoning.
     * Deduplicates concurrent init requests for the same server+config.
     * Stale failure stubs are retried after `CONFIG_STUB_RETRY_MS` to recover from transient errors.
     */
    private ensureSingleConfigServer;
    /**
     * Lazily initializes a config-source MCP server: inspects capabilities/tools, then
     * stores the parsed config in the config cache with `source: 'config'`.
     */
    private lazyInitConfigServer;
    /**
     * Writes a config to `configCacheRepo` using the atomic upsert operation.
     * Safe for cross-process races — the underlying cache handles add-or-update internally.
     */
    private upsertConfigCache;
    /**
     * Clears the config-source server cache, forcing re-inspection on next access.
     * Called when admin config overrides change (e.g., mcpServers mutation).
     *
     * @returns Names of servers that were evicted from the config cache.
     *          Callers should disconnect active connections for these servers.
     */
    invalidateConfigCache(): Promise<string[]>;
    getOAuthServers(userId?: string): Promise<Set<string>>;
    reset(): Promise<void>;
    removeServer(serverName: string, storageLocation: 'CACHE' | 'DB', userId?: string): Promise<void>;
    private getConfigRepository;
    private getReadThroughCacheKey;
    /**
     * Returns memoized YAML server names. Populated lazily on first call after boot/reset.
     * YAML servers don't change after boot, so this avoids repeated `getAll()` calls.
     * Uses promise deduplication to prevent concurrent cold-start double-fetch.
     */
    private getYamlServerNames;
    /**
     * Produces a config-cache key scoped by server name AND a hash of the raw config.
     * Prevents cross-tenant cache poisoning when two tenants define the same server name
     * with different configurations.
     */
    private configCacheKey;
}
//# sourceMappingURL=MCPServersRegistry.d.ts.map