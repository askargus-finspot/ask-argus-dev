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
import { PrincipalType, PrincipalModel } from 'askargus-data-provider';
import type { TCustomConfig } from 'askargus-data-provider';
import type { Document, Types } from 'mongoose';
/**
 * Configuration override for a principal (user, group, or role).
 * Stores partial overrides at the TCustomConfig (YAML) level,
 * which are merged with the base config before processing through AppService.
 */
export type Config = {
    /** The type of principal (user, group, role) */
    principalType: PrincipalType;
    /** The ID of the principal (ObjectId for users/groups, string for roles) */
    principalId: Types.ObjectId | string;
    /** The model name for the principal */
    principalModel: PrincipalModel;
    /** Priority level for determining merge order (higher = more specific) */
    priority: number;
    /** Configuration overrides matching askargus.yaml structure */
    overrides: Partial<TCustomConfig>;
    /** Whether this config override is currently active */
    isActive: boolean;
    /** Version number for cache invalidation, auto-increments on overrides change */
    configVersion: number;
    /** Tenant identifier for multi-tenancy isolation */
    tenantId?: string;
    /** When this config was created */
    createdAt?: Date;
    /** When this config was last updated */
    updatedAt?: Date;
};
export type IConfig = Config & Document & {
    _id: Types.ObjectId;
};
