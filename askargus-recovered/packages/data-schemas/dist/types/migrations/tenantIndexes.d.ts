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
import type { Connection } from 'mongoose';
/**
 * Indexes that were superseded by compound tenant-scoped indexes.
 * Each entry maps a collection name to the old index names that must be dropped
 * before multi-tenancy can function (old unique indexes enforce global uniqueness,
 * blocking same-value-different-tenant writes).
 *
 * These are only the indexes whose uniqueness constraints conflict with multi-tenancy.
 * Non-unique indexes that were extended with tenantId are harmless (queries still work,
 * just with slightly less optimal plans) and are not included here.
 */
declare const SUPERSEDED_INDEXES: Record<string, string[]>;
interface MigrationResult {
    dropped: string[];
    skipped: string[];
    errors: string[];
}
/**
 * Drops superseded unique indexes that block multi-tenant operation.
 * Idempotent — skips indexes that don't exist. Safe to run on fresh databases.
 *
 * Call this before enabling multi-tenant middleware on an existing deployment.
 * On a fresh database (no pre-existing data), this is a no-op.
 */
export declare function dropSupersededTenantIndexes(connection: Connection): Promise<MigrationResult>;
/** Exported for testing — the raw index map */
export { SUPERSEDED_INDEXES };
