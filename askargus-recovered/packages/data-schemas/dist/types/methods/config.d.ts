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
import { Types } from 'mongoose';
import { PrincipalType, PrincipalModel } from 'askargus-data-provider';
import type { TCustomConfig } from 'askargus-data-provider';
import type { ClientSession } from 'mongoose';
import type { IConfig } from '~/types';
export declare function createConfigMethods(mongoose: typeof import('mongoose')): {
    listAllConfigs: (filter?: {
        isActive?: boolean;
    }, session?: ClientSession) => Promise<IConfig[]>;
    findConfigByPrincipal: (principalType: PrincipalType, principalId: string | Types.ObjectId, options?: {
        includeInactive?: boolean;
    }, session?: ClientSession) => Promise<IConfig | null>;
    getApplicableConfigs: (principals?: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>, session?: ClientSession) => Promise<IConfig[]>;
    upsertConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId, principalModel: PrincipalModel, overrides: Partial<TCustomConfig>, priority: number, session?: ClientSession) => Promise<IConfig | null>;
    patchConfigFields: (principalType: PrincipalType, principalId: string | Types.ObjectId, principalModel: PrincipalModel, fields: Record<string, unknown>, priority: number, session?: ClientSession) => Promise<IConfig | null>;
    unsetConfigField: (principalType: PrincipalType, principalId: string | Types.ObjectId, fieldPath: string, session?: ClientSession) => Promise<IConfig | null>;
    deleteConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId, session?: ClientSession) => Promise<IConfig | null>;
    toggleConfigActive: (principalType: PrincipalType, principalId: string | Types.ObjectId, isActive: boolean, session?: ClientSession) => Promise<IConfig | null>;
};
export type ConfigMethods = ReturnType<typeof createConfigMethods>;
