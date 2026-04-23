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
/** Factory function that takes mongoose instance and returns the key methods */
export declare function createKeyMethods(mongoose: typeof import('mongoose')): {
    getUserKey: (params: {
        userId: string;
        name: string;
    }) => Promise<string>;
    updateUserKey: (params: {
        userId: string;
        name: string;
        value: string;
        expiresAt?: Date | null;
    }) => Promise<unknown>;
    deleteUserKey: (params: {
        userId: string;
        name?: string;
        all?: boolean;
    }) => Promise<unknown>;
    getUserKeyValues: (params: {
        userId: string;
        name: string;
    }) => Promise<Record<string, string>>;
    getUserKeyExpiry: (params: {
        userId: string;
        name: string;
    }) => Promise<{
        expiresAt: Date | 'never' | null;
    }>;
};
export type KeyMethods = ReturnType<typeof createKeyMethods>;
