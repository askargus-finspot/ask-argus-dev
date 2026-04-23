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
import type { Model, Types } from 'mongoose';
import type { IPrompt, IPromptGroupDocument } from '~/types';
export interface PromptDeps {
    /** Removes all ACL permissions for a resource. Injected from PermissionService. */
    removeAllPermissions: (params: {
        resourceType: string;
        resourceId: unknown;
    }) => Promise<void>;
    /** Returns resource IDs solely owned by the given user. From createAclEntryMethods. */
    getSoleOwnedResourceIds: (userObjectId: Types.ObjectId, resourceTypes: string | string[]) => Promise<Types.ObjectId[]>;
}
export declare function createPromptMethods(mongoose: typeof import('mongoose'), deps: PromptDeps): {
    getPromptGroups: (filter: Record<string, unknown>) => Promise<{
        promptGroups: Record<string, unknown>[];
        pageNumber: string;
        pageSize: string;
        pages: string;
        message?: undefined;
    } | {
        message: string;
        promptGroups?: undefined;
        pageNumber?: undefined;
        pageSize?: undefined;
        pages?: undefined;
    }>;
    deletePromptGroup: ({ _id }: {
        _id: string;
    }) => Promise<{
        message: string;
    }>;
    getAllPromptGroups: (filter: Record<string, unknown>) => Promise<Record<string, unknown>[] | {
        message: string;
    }>;
    getListPromptGroupsByAccess: ({ accessibleIds, otherParams, limit, after, }: {
        accessibleIds?: Types.ObjectId[] | undefined;
        otherParams?: Record<string, unknown> | undefined;
        limit?: number | null | undefined;
        after?: string | null | undefined;
    }) => Promise<{
        object: "list";
        data: Record<string, unknown>[];
        first_id: string | null;
        last_id: string | null;
        has_more: boolean;
        after: string | null;
    }>;
    incrementPromptGroupUsage: (groupId: string) => Promise<{
        numberOfGenerations: number;
    }>;
    createPromptGroup: (saveData: {
        prompt: Record<string, unknown>;
        group: Record<string, unknown>;
        author: string;
        authorName: string;
    }) => Promise<{
        prompt: import("mongoose").FlattenMaps<IPrompt> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        };
        group: {
            productionPrompt: {
                prompt: string;
            };
            name: string;
            numberOfGenerations: number;
            oneliner: string;
            category: string;
            productionId: Types.ObjectId;
            author: Types.ObjectId;
            authorName: string;
            command?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            isPublic?: boolean | undefined;
            tenantId?: string | undefined;
            _id: import("mongoose").FlattenMaps<unknown>;
            $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<IPromptGroupDocument, keyof Paths> & Paths;
            $clearModifiedPaths: () => IPromptGroupDocument;
            $clone: () => IPromptGroupDocument;
            $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
            $getAllSubdocs: () => import("mongoose").Document<unknown, any, any>[];
            $ignore: (path: string) => void;
            $isDefault: (path: string) => boolean;
            $isDeleted: (val?: boolean | undefined) => boolean;
            $getPopulatedDocs: () => import("mongoose").Document<unknown, any, any>[];
            $inc: (path: string | string[], val?: number | undefined) => IPromptGroupDocument;
            $isEmpty: (path: string) => boolean;
            $isValid: (path: string) => boolean;
            $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
            $markValid: (path: string) => void;
            $model: {
                <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType;
                <ModelType_1 = Model<any, {}, {}, {}, any, any>>(): ModelType_1;
            };
            $op: "save" | "validate" | "remove" | null;
            $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => IPromptGroupDocument;
            $session: (session?: import("mongodb").ClientSession | null | undefined) => import("mongodb").ClientSession | null;
            $set: {
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions | undefined): IPromptGroupDocument;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions | undefined): IPromptGroupDocument;
                (value: string | Record<string, any>): IPromptGroupDocument;
            };
            $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
            baseModelName?: string | undefined;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
            deleteOne: (options?: import("mongoose").QueryOptions<unknown> | undefined) => any;
            depopulate: <Paths_1 = {}>(path?: string | string[] | undefined) => import("mongoose").MergeType<IPromptGroupDocument, Paths_1>;
            directModifiedPaths: () => string[];
            equals: (doc: import("mongoose").Document<unknown, any, any>) => boolean;
            errors?: import("mongoose").Error.ValidationError | undefined;
            get: {
                <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
                (path: string, type?: any, options?: any): any;
            };
            getChanges: () => import("mongoose").UpdateQuery<IPromptGroupDocument>;
            id?: any;
            increment: () => IPromptGroupDocument;
            init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject | undefined) => IPromptGroupDocument;
            invalidate: {
                <T_1 extends string | number | symbol>(path: T_1, errorMsg: string | NativeError, value?: any, kind?: string | undefined): NativeError | null;
                (path: string, errorMsg: string | NativeError, value?: any, kind?: string | undefined): NativeError | null;
            };
            isDirectModified: {
                <T_2 extends string | number | symbol>(path: T_2 | T_2[]): boolean;
                (path: string | string[]): boolean;
            };
            isDirectSelected: {
                <T_3 extends string | number | symbol>(path: T_3): boolean;
                (path: string): boolean;
            };
            isInit: {
                <T_4 extends string | number | symbol>(path: T_4): boolean;
                (path: string): boolean;
            };
            isModified: {
                <T_5 extends string | number | symbol>(path?: T_5 | T_5[] | undefined, options?: {
                    ignoreAtomics?: boolean | undefined;
                } | null | undefined): boolean;
                (path?: string | string[] | undefined, options?: {
                    ignoreAtomics?: boolean | undefined;
                } | null | undefined): boolean;
            };
            isNew: boolean;
            isSelected: {
                <T_6 extends string | number | symbol>(path: T_6): boolean;
                (path: string): boolean;
            };
            markModified: {
                <T_7 extends string | number | symbol>(path: T_7, scope?: any): void;
                (path: string, scope?: any): void;
            };
            model: {
                <ModelType_2 = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }, any>>(name: string): ModelType_2;
                <ModelType_3 = Model<any, {}, {}, {}, any, any>>(): ModelType_3;
            };
            modifiedPaths: (options?: {
                includeChildren?: boolean | undefined;
            } | undefined) => string[];
            overwrite: (obj: import("mongoose").AnyObject) => IPromptGroupDocument;
            $parent: () => import("mongoose").Document<unknown, any, any> | undefined;
            populate: {
                <Paths_2 = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<IPromptGroupDocument, Paths_2>>;
                <Paths_3 = {}>(path: string, select?: string | import("mongoose").AnyObject | undefined, model?: Model<any, {}, {}, {}, any, any> | undefined, match?: import("mongoose").AnyObject | undefined, options?: import("mongoose").PopulateOptions | undefined): Promise<import("mongoose").MergeType<IPromptGroupDocument, Paths_3>>;
            };
            populated: (path: string) => any;
            replaceOne: (replacement?: import("mongoose").AnyObject | undefined, options?: import("mongoose").QueryOptions<unknown> | null | undefined) => import("mongoose").Query<any, IPromptGroupDocument, {}, unknown, "find", Record<string, never>>;
            save: (options?: import("mongoose").SaveOptions | undefined) => Promise<IPromptGroupDocument>;
            schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
                [x: string]: unknown;
            }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
                [x: string]: unknown;
            }>> & import("mongoose").FlatRecord<{
                [x: string]: unknown;
            }> & Required<{
                _id: unknown;
            }> & {
                __v: number;
            }>>;
            set: {
                <T_8 extends string | number | symbol>(path: T_8, val: any, type: any, options?: import("mongoose").DocumentSetOptions | undefined): IPromptGroupDocument;
                (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions | undefined): IPromptGroupDocument;
                (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions | undefined): IPromptGroupDocument;
                (value: string | Record<string, any>): IPromptGroupDocument;
            };
            toJSON: {
                (options?: (import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps?: true | undefined;
                    flattenObjectIds?: false | undefined;
                }) | undefined): import("mongoose").FlattenMaps<any>;
                (options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<any>;
                (options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenObjectIds: true;
                }): {
                    [x: string]: any;
                };
                (options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps: false;
                }): any;
                (options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): any;
                <T_9 = any>(options?: (import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps?: true | undefined;
                    flattenObjectIds?: false | undefined;
                }) | undefined): import("mongoose").FlattenMaps<T_9>;
                <T_10 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenObjectIds: false;
                }): import("mongoose").FlattenMaps<T_10>;
                <T_11 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T_11>>;
                <T_12 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps: false;
                }): T_12;
                <T_13 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> & {
                    flattenMaps: false;
                    flattenObjectIds: true;
                }): import("mongoose").ObjectIdToString<T_13>;
            };
            toObject: {
                (options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> | undefined): any;
                <T_14>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & {
                    _id: Types.ObjectId;
                } & {
                    __v: number;
                }> | undefined): import("mongoose").Default__v<import("mongoose").Require_id<T_14>>;
            };
            unmarkModified: {
                <T_15 extends string | number | symbol>(path: T_15): void;
                (path: string): void;
            };
            updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<IPromptGroupDocument> | undefined, options?: import("mongoose").QueryOptions<unknown> | null | undefined) => import("mongoose").Query<any, IPromptGroupDocument, {}, unknown, "find", Record<string, never>>;
            validate: {
                <T_16 extends string | number | symbol>(pathsToValidate?: T_16 | T_16[] | undefined, options?: import("mongoose").AnyObject | undefined): Promise<void>;
                (pathsToValidate?: import("mongoose").PathsToValidate | undefined, options?: import("mongoose").AnyObject | undefined): Promise<void>;
                (options: {
                    pathsToSkip?: import("mongoose").pathsToSkip | undefined;
                }): Promise<void>;
            };
            validateSync: {
                (options: {
                    [k: string]: any;
                    pathsToSkip?: import("mongoose").pathsToSkip | undefined;
                }): import("mongoose").Error.ValidationError | null;
                <T_17 extends string | number | symbol>(pathsToValidate?: T_17 | T_17[] | undefined, options?: import("mongoose").AnyObject | undefined): import("mongoose").Error.ValidationError | null;
                (pathsToValidate?: import("mongoose").PathsToValidate | undefined, options?: import("mongoose").AnyObject | undefined): import("mongoose").Error.ValidationError | null;
            };
            __v: number;
        };
    }>;
    savePrompt: (saveData: {
        prompt: Record<string, unknown>;
        author: string | Types.ObjectId;
    }) => Promise<{
        prompt: import("mongoose").Document<unknown, {}, IPrompt> & IPrompt & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        message?: undefined;
    } | {
        message: string;
        prompt?: undefined;
    }>;
    getPrompts: (filter: Record<string, unknown>) => Promise<(import("mongoose").FlattenMaps<IPrompt> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[] | {
        message: string;
    }>;
    getPrompt: (filter: Record<string, unknown>) => Promise<(import("mongoose").FlattenMaps<IPrompt> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | {
        message: string;
    } | null>;
    getRandomPromptGroups: (filter: {
        skip: number | string;
        limit: number | string;
    }) => Promise<{
        prompts: unknown[];
        message?: undefined;
    } | {
        message: string;
        prompts?: undefined;
    }>;
    getPromptGroupsWithPrompts: (filter: Record<string, unknown>) => Promise<(import("mongoose").FlattenMaps<IPromptGroupDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | {
        message: string;
    } | null>;
    getPromptGroup: (filter: Record<string, unknown>) => Promise<any>;
    getOwnedPromptGroupIds: (author: string) => Promise<import("mongoose").FlattenMaps<unknown>[]>;
    deletePrompt: ({ promptId, groupId, }: {
        promptId: string | Types.ObjectId;
        groupId: string | Types.ObjectId;
    }) => Promise<{
        prompt: string;
        promptGroup: {
            message: string;
            id: string | Types.ObjectId;
        };
    } | {
        prompt: string;
        promptGroup?: undefined;
    }>;
    deleteUserPrompts: (userId: string) => Promise<void>;
    updatePromptGroup: (filter: Record<string, unknown>, data: Record<string, unknown>) => Promise<(import("mongoose").Document<unknown, {}, IPromptGroupDocument> & IPromptGroupDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        message: string;
    }>;
    makePromptProduction: (promptId: string) => Promise<{
        message: string;
    }>;
    updatePromptLabels: (_id: string, labels: unknown) => Promise<{
        message: string;
    }>;
};
export type PromptMethods = ReturnType<typeof createPromptMethods>;
