/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/query" />
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
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { PrincipalType } from 'askargus-data-provider';
import type { IRole, IUser, IConfig } from '@askargus/data-schemas';
import type { FilterQuery, Types } from 'mongoose';
import type { Response } from 'express';
import type { ServerRequest } from '~/types/http';
export type RoleListItem = {
    _id: Types.ObjectId | string;
    name: string;
    description?: string;
};
export interface AdminRolesDeps {
    listRoles: (options?: {
        limit?: number;
        offset?: number;
    }) => Promise<RoleListItem[]>;
    countRoles: () => Promise<number>;
    getRoleByName: (name: string, fields?: string | string[] | null) => Promise<IRole | null>;
    createRoleByName: (roleData: Partial<IRole>) => Promise<IRole>;
    updateRoleByName: (name: string, updates: Partial<IRole>) => Promise<IRole | null>;
    updateAccessPermissions: (name: string, perms: Record<string, Record<string, boolean>>, roleData?: IRole) => Promise<void>;
    deleteRoleByName: (name: string) => Promise<IRole | null>;
    findUser: (criteria: FilterQuery<IUser>, fields?: string | string[] | null) => Promise<IUser | null>;
    updateUser: (userId: string, data: Partial<IUser>) => Promise<IUser | null>;
    updateUsersByRole: (oldRole: string, newRole: string) => Promise<void>;
    findUserIdsByRole: (roleName: string) => Promise<string[]>;
    updateUsersRoleByIds: (userIds: string[], newRole: string) => Promise<void>;
    listUsersByRole: (roleName: string, options?: {
        limit?: number;
        offset?: number;
    }) => Promise<IUser[]>;
    countUsersByRole: (roleName: string) => Promise<number>;
    /** Removes the per-principal config override (keyed by type + name, not ObjectId). */
    deleteConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId) => Promise<IConfig | null>;
    /** Removes all ACL entries scoped to this principal. */
    deleteAclEntries: (filter: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
    }) => Promise<void>;
    /** Removes all system capability grants held by this principal. */
    deleteGrantsForPrincipal: (principalType: PrincipalType, principalId: string | Types.ObjectId, options?: {
        tenantId?: string;
    }) => Promise<void>;
}
export declare function createAdminRolesHandlers(deps: AdminRolesDeps): {
    listRoles: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRole: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    createRole: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateRole: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateRolePermissions: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteRole: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getRoleMembers: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    addRoleMember: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    removeRoleMember: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=roles.d.ts.map