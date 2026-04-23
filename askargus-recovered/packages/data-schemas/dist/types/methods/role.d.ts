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
import type { IRole, IUser } from '~/types';
export declare class RoleConflictError extends Error {
    constructor(message: string);
}
export interface RoleDeps {
    /** Returns a cache store for the given key. Injected from getLogStores. */
    getCache?: (key: string) => {
        get: (k: string) => Promise<unknown>;
        set: (k: string, v: unknown) => Promise<void>;
    };
}
export declare function createRoleMethods(mongoose: typeof import('mongoose'), deps?: RoleDeps): {
    listRoles: (options?: {
        limit?: number;
        offset?: number;
    }) => Promise<Pick<IRole, '_id' | 'name' | 'description'>[]>;
    countRoles: () => Promise<number>;
    initializeRoles: () => Promise<void>;
    getRoleByName: (roleName: string, fieldsToSelect?: string | string[] | null) => Promise<IRole>;
    updateRoleByName: (roleName: string, updates: Partial<IRole>) => Promise<IRole>;
    updateAccessPermissions: (roleName: string, permissionsUpdate: Record<string, Record<string, boolean>>, roleData?: IRole) => Promise<void>;
    migrateRoleSchema: (roleName?: string) => Promise<number>;
    createRoleByName: (roleData: Partial<IRole>) => Promise<IRole>;
    deleteRoleByName: (roleName: string) => Promise<IRole | null>;
    updateUsersByRole: (oldRole: string, newRole: string) => Promise<void>;
    findUserIdsByRole: (roleName: string) => Promise<string[]>;
    updateUsersRoleByIds: (userIds: string[], newRole: string) => Promise<void>;
    listUsersByRole: (roleName: string, options?: {
        limit?: number;
        offset?: number;
    }) => Promise<IUser[]>;
    countUsersByRole: (roleName: string) => Promise<number>;
};
export type RoleMethods = ReturnType<typeof createRoleMethods>;
