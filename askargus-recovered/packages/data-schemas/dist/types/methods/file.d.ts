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
import { EToolResources } from 'askargus-data-provider';
import type { FilterQuery, SortOrder } from 'mongoose';
import type { IMongoFile } from '~/types/file';
/** Factory function that takes mongoose instance and returns the file methods */
export declare function createFileMethods(mongoose: typeof import('mongoose')): {
    findFileById: (file_id: string, options?: Record<string, unknown>) => Promise<IMongoFile | null>;
    getFiles: (filter: FilterQuery<IMongoFile>, _sortOptions?: Record<string, SortOrder> | null, selectFields?: string | Record<string, 0 | 1> | null | undefined) => Promise<IMongoFile[] | null>;
    getToolFilesByIds: (fileIds: string[], toolResourceSet?: Set<EToolResources>) => Promise<IMongoFile[]>;
    getCodeGeneratedFiles: (conversationId: string, messageIds?: string[]) => Promise<IMongoFile[]>;
    getUserCodeFiles: (fileIds?: string[]) => Promise<IMongoFile[]>;
    claimCodeFile: (data: {
        filename: string;
        conversationId: string;
        file_id: string;
        user: string;
    }) => Promise<IMongoFile>;
    createFile: (data: Partial<IMongoFile>, disableTTL?: boolean) => Promise<IMongoFile | null>;
    updateFile: (data: Partial<IMongoFile> & {
        file_id: string;
    }) => Promise<IMongoFile | null>;
    updateFileUsage: (data: {
        file_id: string;
        inc?: number;
    }) => Promise<IMongoFile | null>;
    deleteFile: (file_id: string) => Promise<IMongoFile | null>;
    deleteFiles: (file_ids: string[], user?: string) => Promise<{
        deletedCount?: number;
    }>;
    deleteFileByFilter: (filter: FilterQuery<IMongoFile>) => Promise<IMongoFile | null>;
    batchUpdateFiles: (updates: Array<{
        file_id: string;
        filepath: string;
    }>) => Promise<void>;
    updateFilesUsage: (files: Array<{
        file_id: string;
    }>, fileIds?: string[]) => Promise<IMongoFile[]>;
};
export type FileMethods = ReturnType<typeof createFileMethods>;
