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
import type { RootFilterQuery, Types } from 'mongoose';
import type { MCPServerDocument } from '../types';
import type { MCPOptions } from 'askargus-data-provider';
export declare function createMCPServerMethods(mongoose: typeof import('mongoose')): {
    createMCPServer: (data: {
        config: MCPOptions;
        author: string | Types.ObjectId;
    }) => Promise<MCPServerDocument>;
    findMCPServerByServerName: (serverName: string) => Promise<MCPServerDocument | null>;
    findMCPServerByObjectId: (_id: string | Types.ObjectId) => Promise<MCPServerDocument | null>;
    findMCPServersByAuthor: (authorId: string | Types.ObjectId) => Promise<MCPServerDocument[]>;
    getListMCPServersByIds: ({ ids, otherParams, limit, after, }: {
        ids?: Types.ObjectId[] | undefined;
        otherParams?: RootFilterQuery<MCPServerDocument> | undefined;
        limit?: number | null | undefined;
        after?: string | null | undefined;
    }) => Promise<{
        data: MCPServerDocument[];
        has_more: boolean;
        after: string | null;
    }>;
    getListMCPServersByNames: ({ names }: {
        names: string[];
    }) => Promise<{
        data: MCPServerDocument[];
    }>;
    updateMCPServer: (serverName: string, updateData: {
        config?: MCPOptions;
    }) => Promise<MCPServerDocument | null>;
    deleteMCPServer: (serverName: string) => Promise<MCPServerDocument | null>;
};
export type MCPServerMethods = ReturnType<typeof createMCPServerMethods>;
