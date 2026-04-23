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
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { PrincipalType } from 'askargus-data-provider';
import type { ISystemGrant, SystemCapability } from '@askargus/data-schemas';
import type { Response } from 'express';
import type { Types } from 'mongoose';
import type { ResolvedPrincipal } from '~/types/principal';
import type { ServerRequest } from '~/types/http';
export interface AdminGrantsDeps {
    listGrants: (options?: {
        tenantId?: string;
        principalTypes?: PrincipalType[];
        limit?: number;
        offset?: number;
    }) => Promise<ISystemGrant[]>;
    countGrants: (options?: {
        tenantId?: string;
        principalTypes?: PrincipalType[];
    }) => Promise<number>;
    getCapabilitiesForPrincipal: (params: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        tenantId?: string;
    }) => Promise<ISystemGrant[]>;
    getCapabilitiesForPrincipals: (params: {
        principals: Array<{
            principalType: PrincipalType;
            principalId: string | Types.ObjectId;
        }>;
        tenantId?: string;
    }) => Promise<ISystemGrant[]>;
    grantCapability: (params: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        capability: SystemCapability;
        tenantId?: string;
        grantedBy?: string | Types.ObjectId;
    }) => Promise<ISystemGrant | null>;
    revokeCapability: (params: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        capability: SystemCapability;
        tenantId?: string;
    }) => Promise<void>;
    getUserPrincipals: (params: {
        userId: string;
        role?: string | null;
        tenantId?: string;
    }) => Promise<ResolvedPrincipal[]>;
    hasCapabilityForPrincipals: (params: {
        principals: ResolvedPrincipal[];
        capability: SystemCapability;
        tenantId?: string;
    }) => Promise<boolean>;
    getHeldCapabilities: (params: {
        principals: ResolvedPrincipal[];
        capabilities: SystemCapability[];
        tenantId?: string;
    }) => Promise<Set<SystemCapability>>;
    getCachedPrincipals?: (user: {
        id: string;
        role: string;
        tenantId?: string;
    }) => ResolvedPrincipal[] | undefined;
    checkRoleExists?: (roleId: string) => Promise<boolean>;
}
/** Currently ROLE-only; Record/Set structure preserved for future principal-type expansion. */
export type GrantPrincipalType = PrincipalType.ROLE;
/** Creates admin grant handlers with dependency injection for the /api/admin/grants routes. */
export declare function createAdminGrantsHandlers(deps: AdminGrantsDeps): {
    listGrants: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getEffectiveCapabilities: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getPrincipalGrants: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    assignGrant: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    revokeGrant: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=grants.d.ts.map