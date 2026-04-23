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
import type { AnyBulkWriteOperation, Model, MongooseBulkWriteOptions } from 'mongoose';
import type { BulkWriteResult } from 'mongodb';
/** Resets the cached strict-mode flag. Exposed for test teardown only. */
export declare function _resetBulkWriteStrictCache(): void;
/**
 * Tenant-safe wrapper around Mongoose `Model.bulkWrite()`.
 *
 * Mongoose's `bulkWrite` does not trigger schema-level middleware hooks, so the
 * `applyTenantIsolation` plugin cannot intercept it. This wrapper:
 *
 * 1. **Sanitizes** every update document by stripping `tenantId` unconditionally
 *    (both top-level and inside `$set`/`$unset`/`$setOnInsert`/`$rename`).
 * 2. **Injects** `tenantId` into operation filters and insert documents when a
 *    tenant context is active.
 *
 * Unlike the Mongoose middleware guard (`sanitizeTenantIdMutation`), which throws
 * on cross-tenant values, this wrapper strips silently. Throwing mid-batch would
 * abort the entire write for one bad field; the filter injection already scopes
 * every operation to the correct tenant.
 *
 * Behavior:
 * - **tenantId present** (normal request): sanitize + inject into filters/documents.
 * - **SYSTEM_TENANT_ID**: sanitize only, skip injection (cross-tenant system op).
 * - **No tenantId + strict mode**: throws (fail-closed, same as the plugin).
 * - **No tenantId + non-strict**: sanitize only, no injection (backward compat).
 */
export declare function tenantSafeBulkWrite<T>(model: Model<T>, ops: AnyBulkWriteOperation[], options?: MongooseBulkWriteOptions): Promise<BulkWriteResult>;
