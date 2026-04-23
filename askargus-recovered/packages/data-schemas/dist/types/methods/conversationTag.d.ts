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
export declare function createConversationTagMethods(mongoose: typeof import('mongoose')): {
    getConversationTags: (user: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user: string;
        tag: string;
        description?: string | undefined;
        position: number;
        count: number;
        createdAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createConversationTag: (user: string, data: {
        tag: string;
        description?: string;
        addToConversation?: boolean;
        conversationId?: string;
    }) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user: string;
        tag: string;
        description?: string | undefined;
        position: number;
        count: number;
        createdAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateConversationTag: (user: string, oldTag: string, data: {
        tag?: string;
        description?: string;
        position?: number;
    }) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user: string;
        tag: string;
        description?: string | undefined;
        position: number;
        count: number;
        createdAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteConversationTag: (user: string, tag: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user: string;
        tag: string;
        description?: string | undefined;
        position: number;
        count: number;
        createdAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteConversationTags: (filter: Record<string, unknown>) => Promise<number>;
    bulkIncrementTagCounts: (user: string, tags: string[]) => Promise<void>;
    updateTagsForConversation: (user: string, conversationId: string, tags: string[]) => Promise<any>;
};
export type ConversationTagMethods = ReturnType<typeof createConversationTagMethods>;
