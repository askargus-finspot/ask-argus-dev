/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/types" />
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
import { Types } from 'mongoose';
import { PrincipalType } from 'askargus-data-provider';
import type { IUser, IConfig, UserDeleteResult } from '@askargus/data-schemas';
import type { FilterQuery } from 'mongoose';
import type { Response } from 'express';
import type { ServerRequest } from '~/types/http';
export interface AdminUsersDeps {
    findUsers: (searchCriteria: FilterQuery<IUser>, fieldsToSelect?: string | string[] | null, options?: {
        limit?: number;
        offset?: number;
        sort?: Record<string, 1 | -1>;
    }) => Promise<IUser[]>;
    countUsers: (filter?: FilterQuery<IUser>) => Promise<number>;
    /**
     * Thin data-layer delete — removes the User document only.
     * Full cascade of user-owned resources (conversations, messages, files, tokens, etc.)
     * is handled by `UserController.deleteUserController` in the self-delete flow.
     * This admin endpoint currently cascades Config and AclEntries.
     * A future iteration should consolidate the full cascade into a shared service function.
     */
    deleteUserById: (userId: string) => Promise<UserDeleteResult>;
    deleteConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId) => Promise<IConfig | null>;
    deleteAclEntries: (filter: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
    }) => Promise<void>;
}
export declare function createAdminUsersHandlers(deps: AdminUsersDeps): {
    listUsers: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    searchUsers: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=users.d.ts.map