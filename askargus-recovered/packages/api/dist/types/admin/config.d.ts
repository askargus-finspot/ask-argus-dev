/// <reference types="mongoose/types/session" />
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
import { PrincipalType, PrincipalModel } from 'askargus-data-provider';
import type { TCustomConfig } from 'askargus-data-provider';
import type { AppConfig, ConfigSection, IConfig } from '@askargus/data-schemas';
import type { Types, ClientSession } from 'mongoose';
import type { Response } from 'express';
import type { CapabilityUser } from '~/middleware/capabilities';
import type { ServerRequest } from '~/types/http';
export declare function isValidFieldPath(path: string): boolean;
export declare function getTopLevelSection(fieldPath: string): string;
export interface AdminConfigDeps {
    listAllConfigs: (filter?: {
        isActive?: boolean;
    }, session?: ClientSession) => Promise<IConfig[]>;
    findConfigByPrincipal: (principalType: PrincipalType, principalId: string | Types.ObjectId, options?: {
        includeInactive?: boolean;
    }, session?: ClientSession) => Promise<IConfig | null>;
    upsertConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId, principalModel: PrincipalModel, overrides: Partial<TCustomConfig>, priority: number, session?: ClientSession) => Promise<IConfig | null>;
    patchConfigFields: (principalType: PrincipalType, principalId: string | Types.ObjectId, principalModel: PrincipalModel, fields: Record<string, unknown>, priority: number, session?: ClientSession) => Promise<IConfig | null>;
    unsetConfigField: (principalType: PrincipalType, principalId: string | Types.ObjectId, fieldPath: string, session?: ClientSession) => Promise<IConfig | null>;
    deleteConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId, session?: ClientSession) => Promise<IConfig | null>;
    toggleConfigActive: (principalType: PrincipalType, principalId: string | Types.ObjectId, isActive: boolean, session?: ClientSession) => Promise<IConfig | null>;
    hasConfigCapability: (user: CapabilityUser, section: ConfigSection | null, verb?: 'manage' | 'read') => Promise<boolean>;
    getAppConfig?: (options?: {
        role?: string;
        userId?: string;
        tenantId?: string;
    }) => Promise<AppConfig>;
    /** Invalidate all config-related caches after a mutation. */
    invalidateConfigCaches?: (tenantId?: string) => Promise<void>;
}
export declare function createAdminConfigHandlers(deps: AdminConfigDeps): {
    listConfigs: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getBaseConfig: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getConfig: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    upsertConfigOverrides: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    patchConfigField: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteConfigField: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteConfigOverrides: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    toggleConfig: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=config.d.ts.map