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
interface IPreset {
    user?: string;
    presetId?: string;
    order?: number;
    defaultPreset?: boolean;
    tools?: (string | {
        pluginKey?: string;
    })[];
    updatedAt?: Date;
    [key: string]: unknown;
}
export declare function createPresetMethods(mongoose: typeof import('mongoose')): {
    getPreset: (user: string, presetId: string) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user?: string | undefined;
        presetId?: string | undefined;
        order?: number | undefined;
        defaultPreset?: boolean | undefined;
        tools?: (string | {
            pluginKey?: string | undefined;
        })[] | undefined;
        updatedAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | {
        message: string;
    } | null>;
    getPresets: (user: string, filter?: Record<string, unknown>) => Promise<(import("mongoose").FlattenMaps<{
        [x: string]: unknown;
        user?: string | undefined;
        presetId?: string | undefined;
        order?: number | undefined;
        defaultPreset?: boolean | undefined;
        tools?: (string | {
            pluginKey?: string | undefined;
        })[] | undefined;
        updatedAt?: Date | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[] | {
        message: string;
    }>;
    savePreset: (user: string, { presetId, newPresetId, defaultPreset, ...preset }: {
        [key: string]: unknown;
        presetId?: string | undefined;
        newPresetId?: string | undefined;
        defaultPreset?: boolean | undefined;
    }) => Promise<(import("mongoose").Document<unknown, {}, IPreset> & IPreset & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | {
        message: string;
    }>;
    deletePresets: (user: string, filter?: Record<string, unknown>) => Promise<import("mongodb").DeleteResult>;
};
export type PresetMethods = ReturnType<typeof createPresetMethods>;
export {};
