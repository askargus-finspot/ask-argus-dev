/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/types" />
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
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types } from 'mongoose';
import type { PipelineStage, AnyBulkWriteOperation } from 'mongoose';
export interface Principal {
    type: string;
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    source?: string;
    idOnTheSource?: string;
    accessRoleId: string;
    isImplicit?: boolean;
}
export interface EnricherDependencies {
    aggregateAclEntries: (pipeline: PipelineStage[]) => Promise<Record<string, unknown>[]>;
    bulkWriteAclEntries: (ops: AnyBulkWriteOperation<unknown>[], options?: Record<string, unknown>) => Promise<unknown>;
    findRoleByIdentifier: (accessRoleId: string) => Promise<{
        _id: Types.ObjectId;
        permBits: number;
    } | null>;
    logger: {
        error: (msg: string, ...args: unknown[]) => void;
    };
}
export interface EnrichResult {
    principals: Principal[];
    entriesToBackfill: Types.ObjectId[];
}
/** Enriches REMOTE_AGENT principals with implicit AGENT owners */
export declare function enrichRemoteAgentPrincipals(deps: EnricherDependencies, resourceId: string | Types.ObjectId, principals: Principal[]): Promise<EnrichResult>;
/** Backfills REMOTE_AGENT ACL entries for AGENT owners (fire-and-forget) */
export declare function backfillRemoteAgentPermissions(deps: EnricherDependencies, resourceId: string | Types.ObjectId, entriesToBackfill: Types.ObjectId[]): void;
//# sourceMappingURL=permissions.d.ts.map