/// <reference types="node" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/session" />
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
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { AsyncLocalStorage } from 'node:async_hooks';
import type { SystemCapability, ConfigSection } from '@askargus/data-schemas';
import type { NextFunction, Response } from 'express';
import type { Types, ClientSession } from 'mongoose';
import type { ResolvedPrincipal } from '~/types/principal';
import type { ServerRequest } from '~/types/http';
interface CapabilityDeps {
    getUserPrincipals: (params: {
        userId: string | Types.ObjectId;
        role?: string | null;
    }, session?: ClientSession) => Promise<ResolvedPrincipal[]>;
    hasCapabilityForPrincipals: (params: {
        principals: ResolvedPrincipal[];
        capability: SystemCapability;
        tenantId?: string;
    }) => Promise<boolean>;
}
export interface CapabilityUser {
    id: string;
    role: string;
    tenantId?: string;
}
interface CapabilityStore {
    principals: Map<string, ResolvedPrincipal[]>;
    results: Map<string, boolean>;
}
export type HasCapabilityFn = (user: CapabilityUser, capability: SystemCapability) => Promise<boolean>;
export type RequireCapabilityFn = (capability: SystemCapability) => (req: ServerRequest, res: Response, next: NextFunction) => Promise<void>;
export type HasConfigCapabilityFn = (user: CapabilityUser, section: ConfigSection | null, verb?: 'manage' | 'read') => Promise<boolean>;
/**
 * Per-request store for caching resolved principals and capability check results.
 * When running inside an Express request (via `capabilityContextMiddleware`),
 * duplicate `hasCapability` calls within the same request are served from
 * the in-memory Map instead of hitting the database again.
 * Outside a request context (background jobs, tests), the store is undefined
 * and every check falls through to the database — correct behavior.
 */
export declare const capabilityStore: AsyncLocalStorage<CapabilityStore>;
export declare function capabilityContextMiddleware(_req: ServerRequest, _res: Response, next: NextFunction): void;
/**
 * Reads principals from the per-request ALS cache without side effects.
 * Returns `undefined` when called outside a request context or before
 * `requireCapability` has populated the cache for this user.
 */
export declare function getCachedPrincipals(user: CapabilityUser): ResolvedPrincipal[] | undefined;
/**
 * Factory that creates `hasCapability` and `requireCapability` with injected
 * database methods. Follows the same dependency-injection pattern as
 * `generateCheckAccess`.
 */
export declare function generateCapabilityCheck(deps: CapabilityDeps): {
    hasCapability: HasCapabilityFn;
    requireCapability: RequireCapabilityFn;
    hasConfigCapability: HasConfigCapabilityFn;
};
export {};
//# sourceMappingURL=capabilities.d.ts.map