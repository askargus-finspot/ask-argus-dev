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
import type { FilterQuery } from 'mongoose';
import type { AppConfig, IConversation } from '~/types';
import type { MessageMethods } from './message';
import type { DeleteResult } from 'mongoose';
export interface ConversationMethods {
    getConvoFiles(conversationId: string): Promise<string[]>;
    searchConversation(conversationId: string): Promise<IConversation | null>;
    deleteNullOrEmptyConversations(): Promise<{
        conversations: {
            deletedCount?: number;
        };
        messages: {
            deletedCount?: number;
        };
    }>;
    saveConvo(ctx: {
        userId: string;
        isTemporary?: boolean;
        interfaceConfig?: AppConfig['interfaceConfig'];
    }, data: {
        conversationId: string;
        newConversationId?: string;
        [key: string]: unknown;
    }, metadata?: {
        context?: string;
        unsetFields?: Record<string, number>;
        noUpsert?: boolean;
    }): Promise<IConversation | {
        message: string;
    } | null>;
    bulkSaveConvos(conversations: Array<Record<string, unknown>>): Promise<unknown>;
    getConvosByCursor(user: string, options?: {
        cursor?: string | null;
        limit?: number;
        isArchived?: boolean;
        tags?: string[];
        search?: string;
        sortBy?: string;
        sortDirection?: string;
    }): Promise<{
        conversations: IConversation[];
        nextCursor: string | null;
    }>;
    getConvosQueried(user: string, convoIds: Array<{
        conversationId: string;
    }> | null, cursor?: string | null, limit?: number): Promise<{
        conversations: IConversation[];
        nextCursor: string | null;
        convoMap: Record<string, unknown>;
    }>;
    getConvo(user: string, conversationId: string): Promise<IConversation | null>;
    getConvoTitle(user: string, conversationId: string): Promise<string | null>;
    deleteConvos(user: string, filter: FilterQuery<IConversation>): Promise<DeleteResult & {
        messages: DeleteResult;
    }>;
}
export declare function createConversationMethods(mongoose: typeof import('mongoose'), messageMethods?: Pick<MessageMethods, 'getMessages' | 'deleteMessages'>): ConversationMethods;
