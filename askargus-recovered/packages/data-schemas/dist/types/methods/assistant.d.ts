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
import type { IAssistant } from '~/types';
export declare function createAssistantMethods(mongoose: typeof import('mongoose')): {
    updateAssistantDoc: (searchParams: FilterQuery<IAssistant>, updateData: Partial<IAssistant>) => Promise<IAssistant | null>;
    deleteAssistant: (searchParams: FilterQuery<IAssistant>) => Promise<(import("mongoose").Document<unknown, {}, IAssistant> & IAssistant & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteAssistants: (searchParams: FilterQuery<IAssistant>) => Promise<number>;
    getAssistants: (searchParams: FilterQuery<IAssistant>, select?: string | Record<string, number> | null) => Promise<IAssistant[]>;
    getAssistant: (searchParams: FilterQuery<IAssistant>) => Promise<IAssistant | null>;
};
export type AssistantMethods = ReturnType<typeof createAssistantMethods>;
