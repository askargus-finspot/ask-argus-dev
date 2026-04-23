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
import type { DeleteResult, FilterQuery } from 'mongoose';
import type { AppConfig, IMessage } from '~/types';
export interface MessageMethods {
    saveMessage(ctx: {
        userId: string;
        isTemporary?: boolean;
        interfaceConfig?: AppConfig['interfaceConfig'];
    }, params: Partial<IMessage> & {
        newMessageId?: string;
    }, metadata?: {
        context?: string;
    }): Promise<IMessage | null | undefined>;
    bulkSaveMessages(messages: Array<Partial<IMessage>>, overrideTimestamp?: boolean): Promise<unknown>;
    recordMessage(params: {
        user: string;
        endpoint?: string;
        messageId: string;
        conversationId?: string;
        parentMessageId?: string;
        [key: string]: unknown;
    }): Promise<IMessage | null>;
    updateMessageText(userId: string, params: {
        messageId: string;
        text: string;
    }): Promise<void>;
    updateMessage(userId: string, message: Partial<IMessage> & {
        newMessageId?: string;
    }, metadata?: {
        context?: string;
    }): Promise<Partial<IMessage>>;
    deleteMessagesSince(userId: string, params: {
        messageId: string;
        conversationId: string;
    }): Promise<DeleteResult>;
    getMessages(filter: FilterQuery<IMessage>, select?: string): Promise<IMessage[]>;
    getMessage(params: {
        user: string;
        messageId: string;
    }): Promise<IMessage | null>;
    getMessagesByCursor(filter: FilterQuery<IMessage>, options?: {
        sortField?: string;
        sortOrder?: 1 | -1;
        limit?: number;
        cursor?: string | null;
    }): Promise<{
        messages: IMessage[];
        nextCursor: string | null;
    }>;
    searchMessages(query: string, searchOptions: Partial<IMessage>, hydrate?: boolean): Promise<unknown>;
    deleteMessages(filter: FilterQuery<IMessage>): Promise<DeleteResult>;
}
export declare function createMessageMethods(mongoose: typeof import('mongoose')): MessageMethods;
