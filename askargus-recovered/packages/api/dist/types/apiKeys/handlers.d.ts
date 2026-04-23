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
import type { Request, Response } from 'express';
import type { Types } from 'mongoose';
export interface ApiKeyHandlerDependencies {
    createAgentApiKey: (params: {
        userId: string | Types.ObjectId;
        name: string;
        expiresAt?: Date | null;
    }) => Promise<{
        id: string;
        name: string;
        key: string;
        keyPrefix: string;
        createdAt: Date;
        expiresAt?: Date;
    }>;
    listAgentApiKeys: (userId: string | Types.ObjectId) => Promise<Array<{
        id: string;
        name: string;
        keyPrefix: string;
        lastUsedAt?: Date;
        expiresAt?: Date;
        createdAt: Date;
    }>>;
    deleteAgentApiKey: (keyId: string | Types.ObjectId, userId: string | Types.ObjectId) => Promise<boolean>;
    getAgentApiKeyById: (keyId: string | Types.ObjectId, userId: string | Types.ObjectId) => Promise<{
        id: string;
        name: string;
        keyPrefix: string;
        lastUsedAt?: Date;
        expiresAt?: Date;
        createdAt: Date;
    } | null>;
}
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        _id: Types.ObjectId;
    };
}
export declare function createApiKeyHandlers(deps: ApiKeyHandlerDependencies): {
    createApiKey: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    listApiKeys: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getApiKey: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteApiKey: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export {};
//# sourceMappingURL=handlers.d.ts.map