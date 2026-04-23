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
import type { Types } from 'mongoose';
import type { AgentApiKeyCreateResult, AgentApiKeyCreateData, AgentApiKeyListItem } from '~/types';
export declare function createAgentApiKeyMethods(mongoose: typeof import('mongoose')): {
    createAgentApiKey: (data: AgentApiKeyCreateData) => Promise<AgentApiKeyCreateResult>;
    validateAgentApiKey: (apiKey: string) => Promise<{
        userId: Types.ObjectId;
        keyId: Types.ObjectId;
    } | null>;
    listAgentApiKeys: (userId: string | Types.ObjectId) => Promise<AgentApiKeyListItem[]>;
    deleteAgentApiKey: (keyId: string | Types.ObjectId, userId: string | Types.ObjectId) => Promise<boolean>;
    deleteAllAgentApiKeys: (userId: string | Types.ObjectId) => Promise<number>;
    getAgentApiKeyById: (keyId: string | Types.ObjectId, userId: string | Types.ObjectId) => Promise<AgentApiKeyListItem | null>;
};
export type AgentApiKeyMethods = ReturnType<typeof createAgentApiKeyMethods>;
