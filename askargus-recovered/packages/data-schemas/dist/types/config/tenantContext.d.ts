/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
export interface TenantContext {
    tenantId?: string;
}
/** Sentinel value for deliberate cross-tenant system operations */
export declare const SYSTEM_TENANT_ID = "__SYSTEM__";
/**
 * AsyncLocalStorage instance for propagating tenant context.
 * Callbacks passed to `tenantStorage.run()` must be `async` for the context to propagate
 * through Mongoose query execution. Sync callbacks returning a Mongoose thenable will lose context.
 */
export declare const tenantStorage: AsyncLocalStorage<TenantContext>;
/** Returns the current tenant ID from async context, or undefined if none is set */
export declare function getTenantId(): string | undefined;
/**
 * Runs a function in an explicit cross-tenant system context (bypasses tenant filtering).
 * The callback MUST be async — sync callbacks returning Mongoose thenables will lose context.
 */
export declare function runAsSystem<T>(fn: () => Promise<T>): Promise<T>;
/**
 * Appends `:${tenantId}` to a cache key when a non-system tenant context is active.
 * Returns the base key unchanged when no ALS context is set or when running
 * inside `runAsSystem()` (SYSTEM_TENANT_ID context).
 */
export declare function scopedCacheKey(baseKey: string): string;
