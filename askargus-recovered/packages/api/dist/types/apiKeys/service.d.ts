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
import { ResourceType } from 'askargus-data-provider';
import type { AllMethods, IUser } from '@askargus/data-schemas';
import type { Types } from 'mongoose';
export interface ApiKeyServiceDependencies {
    validateAgentApiKey: AllMethods['validateAgentApiKey'];
    createAgentApiKey: AllMethods['createAgentApiKey'];
    listAgentApiKeys: AllMethods['listAgentApiKeys'];
    deleteAgentApiKey: AllMethods['deleteAgentApiKey'];
    getAgentApiKeyById: AllMethods['getAgentApiKeyById'];
    findUser: (query: {
        _id: string | Types.ObjectId;
    }) => Promise<IUser | null>;
}
export interface RemoteAgentAccessResult {
    hasAccess: boolean;
    permissions: number;
    agent: {
        _id: Types.ObjectId;
        [key: string]: unknown;
    } | null;
}
export declare class AgentApiKeyService {
    private deps;
    constructor(deps: ApiKeyServiceDependencies);
    validateApiKey(apiKey: string): Promise<{
        userId: Types.ObjectId;
        keyId: Types.ObjectId;
    } | null>;
    createApiKey(params: {
        userId: string | Types.ObjectId;
        name: string;
        expiresAt?: Date | null;
    }): Promise<AgentApiKeyCreateResult>;
    listApiKeys(userId: string | Types.ObjectId): Promise<AgentApiKeyListItem[]>;
    deleteApiKey(keyId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<boolean>;
    getApiKeyById(keyId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<any>;
    getUserFromApiKey(apiKey: string): Promise<IUser | null>;
}
export declare function createApiKeyServiceDependencies(mongoose: typeof import('mongoose')): ApiKeyServiceDependencies;
export interface GetRemoteAgentPermissionsDeps {
    getEffectivePermissions: (params: {
        userId: string;
        role?: string;
        resourceType: ResourceType;
        resourceId: string | Types.ObjectId;
    }) => Promise<number>;
}
/** AGENT owners automatically have full REMOTE_AGENT permissions */
export declare function getRemoteAgentPermissions(deps: GetRemoteAgentPermissionsDeps, userId: string, role: string | undefined, resourceId: string | Types.ObjectId): Promise<number>;
export declare function checkRemoteAgentAccess(params: {
    userId: string;
    role?: string;
    agentId: string;
    getAgent: (query: {
        id: string;
    }) => Promise<{
        _id: Types.ObjectId;
        [key: string]: unknown;
    } | null>;
    getEffectivePermissions: (params: {
        userId: string;
        role?: string;
        resourceType: ResourceType;
        resourceId: string | Types.ObjectId;
    }) => Promise<number>;
}): Promise<RemoteAgentAccessResult>;
//# sourceMappingURL=service.d.ts.map