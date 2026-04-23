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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { Schema } from 'mongoose';
/** Resets the cached strict-mode flag. Exposed for test teardown only. */
export declare function _resetStrictCache(): void;
/**
 * Mongoose schema plugin that enforces tenant-level data isolation.
 *
 * - `tenantId` present in async context -> injected into every query filter.
 * - `tenantId` is `SYSTEM_TENANT_ID` -> skips injection (explicit cross-tenant op).
 * - `tenantId` absent + `TENANT_ISOLATION_STRICT=true` -> throws (fail-closed).
 * - `tenantId` absent + strict mode off -> passes through (transitional/pre-tenancy).
 * - Update and replace operations that modify `tenantId` are blocked unless running as system.
 */
export declare function applyTenantIsolation(schema: Schema): void;
