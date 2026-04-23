import { BaseRegistryCache } from './BaseRegistryCache';
/**
 * Cache for tracking MCP Servers Registry global metadata and status across distributed instances.
 * Uses Redis-backed storage to coordinate state between leader and follower nodes.
 * Tracks global initialization status for the registry.
 *
 * Designed to be extended with additional global registry metadata as needed
 * (e.g., last update timestamps, version info, health status).
 * This cache is only meant to be used internally by registry management components.
 */
declare class RegistryStatusCache extends BaseRegistryCache {
    protected readonly cache: import("keyv").Keyv<any>;
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>;
    private get;
    private set;
}
export declare const registryStatusCache: RegistryStatusCache;
export {};
//# sourceMappingURL=RegistryStatusCache.d.ts.map