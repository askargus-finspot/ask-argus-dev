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
import { PrincipalType } from 'askargus-data-provider';
import type { Types, ClientSession } from 'mongoose';
import type { SystemCapability } from '~/types/admin';
import type { ISystemGrant } from '~/types';
export declare function createSystemGrantMethods(mongoose: typeof import('mongoose')): {
    grantCapability: ({ principalType, principalId, capability, tenantId, grantedBy, }: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        capability: SystemCapability;
        tenantId?: string | undefined;
        grantedBy?: string | Types.ObjectId | undefined;
    }, session?: ClientSession) => Promise<ISystemGrant | null>;
    seedSystemGrants: () => Promise<void>;
    revokeCapability: ({ principalType, principalId, capability, tenantId, }: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        capability: SystemCapability;
        tenantId?: string | undefined;
    }, session?: ClientSession) => Promise<void>;
    hasCapabilityForPrincipals: ({ principals, capability, tenantId, }: {
        principals: Array<{
            principalType: PrincipalType;
            principalId?: string | Types.ObjectId;
        }>;
        capability: SystemCapability;
        tenantId?: string | undefined;
    }) => Promise<boolean>;
    getHeldCapabilities: ({ principals, capabilities, tenantId, }: {
        principals: Array<{
            principalType: PrincipalType;
            principalId?: string | Types.ObjectId;
        }>;
        capabilities: SystemCapability[];
        tenantId?: string | undefined;
    }) => Promise<Set<SystemCapability>>;
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
    getCapabilitiesForPrincipal: ({ principalType, principalId, tenantId, }: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
        tenantId?: string | undefined;
    }) => Promise<ISystemGrant[]>;
    getCapabilitiesForPrincipals: ({ principals, tenantId, }: {
        principals: Array<{
            principalType: PrincipalType;
            principalId: string | Types.ObjectId;
        }>;
        tenantId?: string | undefined;
    }) => Promise<ISystemGrant[]>;
    deleteGrantsForPrincipal: (principalType: PrincipalType, principalId: string | Types.ObjectId, options?: {
        tenantId?: string;
        session?: ClientSession;
    }) => Promise<void>;
};
export type SystemGrantMethods = ReturnType<typeof createSystemGrantMethods>;
