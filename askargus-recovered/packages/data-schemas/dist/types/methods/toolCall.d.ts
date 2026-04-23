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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
interface IToolCallData {
    messageId?: string;
    conversationId?: string;
    user?: string;
    [key: string]: unknown;
}
export declare function createToolCallMethods(mongoose: typeof import('mongoose')): {
    createToolCall: (toolCallData: IToolCallData) => Promise<import("mongoose").Document<unknown, {}, IToolCallData> & IToolCallData & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateToolCall: (id: string, updateData: Partial<IToolCallData>) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        messageId?: string | undefined;
        conversationId?: string | undefined;
        user?: string | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteToolCalls: (userId: string, conversationId?: string) => Promise<import("mongodb").DeleteResult>;
    getToolCallById: (id: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        messageId?: string | undefined;
        conversationId?: string | undefined;
        user?: string | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getToolCallsByConvo: (conversationId: string, userId: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        messageId?: string | undefined;
        conversationId?: string | undefined;
        user?: string | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getToolCallsByMessage: (messageId: string, userId: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        messageId?: string | undefined;
        conversationId?: string | undefined;
        user?: string | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
export type ToolCallMethods = ReturnType<typeof createToolCallMethods>;
export {};
