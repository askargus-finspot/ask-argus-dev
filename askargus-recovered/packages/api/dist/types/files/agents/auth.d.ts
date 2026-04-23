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
import type { Response } from 'express';
import type { Types } from 'mongoose';
import { ResourceType } from 'askargus-data-provider';
import type { ServerRequest } from '~/types';
export type AgentUploadAuthResult = {
    allowed: true;
} | {
    allowed: false;
    status: number;
    error: string;
    message: string;
};
export interface AgentUploadAuthParams {
    userId: string;
    userRole: string;
    agentId?: string;
    toolResource?: string | null;
    messageFile?: boolean | string;
}
export interface AgentUploadAuthDeps {
    getAgent: (params: {
        id: string;
    }) => Promise<{
        _id: string | Types.ObjectId;
        author?: string | Types.ObjectId | null;
    } | null>;
    checkPermission: (params: {
        userId: string;
        role: string;
        resourceType: ResourceType;
        resourceId: string | Types.ObjectId;
        requiredPermission: number;
    }) => Promise<boolean>;
}
export declare function checkAgentUploadAuth(params: AgentUploadAuthParams, deps: AgentUploadAuthDeps): Promise<AgentUploadAuthResult>;
/** @returns true if denied (response already sent), false if allowed */
export declare function verifyAgentUploadPermission({ req, res, metadata, getAgent, checkPermission, }: {
    req: ServerRequest;
    res: Response;
    metadata: {
        agent_id?: string;
        tool_resource?: string | null;
        message_file?: boolean | string;
    };
    getAgent: AgentUploadAuthDeps['getAgent'];
    checkPermission: AgentUploadAuthDeps['checkPermission'];
}): Promise<boolean>;
//# sourceMappingURL=auth.d.ts.map