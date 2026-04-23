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
import type { Document, Types } from 'mongoose';
import type { PrincipalType } from 'askargus-data-provider';
import type { SystemCapability } from '~/types/admin';
export type SystemGrant = {
    /** The type of principal — matches PrincipalType enum values */
    principalType: PrincipalType;
    /** ObjectId string for user/group, role name string for role */
    principalId: string | Types.ObjectId;
    /** The capability being granted */
    capability: SystemCapability;
    /** Absent = platform-operator, present = tenant-scoped */
    tenantId?: string;
    /** ID of the user who granted this capability */
    grantedBy?: Types.ObjectId;
    /** When this capability was granted */
    grantedAt?: Date;
    /** Reserved for future TTL enforcement — time-bounded / temporary grants. */
    expiresAt?: Date;
};
export type ISystemGrant = SystemGrant & Document & {
    _id: Types.ObjectId;
};
