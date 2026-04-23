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
import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '@askargus/data-schemas';
import type { Types } from 'mongoose';
export interface ApiKeyAuthDependencies {
    validateAgentApiKey: (apiKey: string) => Promise<{
        userId: Types.ObjectId;
        keyId: Types.ObjectId;
    } | null>;
    findUser: (query: {
        _id: string | Types.ObjectId;
    }) => Promise<IUser | null>;
}
export interface RemoteAgentAccessDependencies {
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
}
export interface ApiKeyAuthRequest extends Request {
    user?: IUser & {
        id: string;
    };
    apiKeyId?: Types.ObjectId;
}
export interface RemoteAgentAccessRequest extends ApiKeyAuthRequest {
    agent?: {
        _id: Types.ObjectId;
        [key: string]: unknown;
    };
    agentPermissions?: number;
}
export declare function createRequireApiKeyAuth(deps: ApiKeyAuthDependencies): (req: ApiKeyAuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function createCheckRemoteAgentAccess(deps: RemoteAgentAccessDependencies): (req: RemoteAgentAccessRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=middleware.d.ts.map