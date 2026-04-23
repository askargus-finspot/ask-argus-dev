/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/models" />
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
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types } from 'mongoose';
import { PrincipalType } from 'askargus-data-provider';
import type { IGroup, IUser, IConfig, GroupFilterOptions } from '@askargus/data-schemas';
import type { FilterQuery, ClientSession, DeleteResult } from 'mongoose';
import type { Response } from 'express';
import type { ServerRequest } from '~/types/http';
type GroupListFilter = Pick<GroupFilterOptions, 'source' | 'search'>;
export interface AdminGroupsDeps {
    listGroups: (filter?: GroupListFilter & {
        limit?: number;
        offset?: number;
    }, session?: ClientSession) => Promise<IGroup[]>;
    countGroups: (filter?: GroupListFilter, session?: ClientSession) => Promise<number>;
    findGroupById: (groupId: string | Types.ObjectId, projection?: Record<string, 0 | 1>, session?: ClientSession) => Promise<IGroup | null>;
    createGroup: (groupData: Partial<IGroup>, session?: ClientSession) => Promise<IGroup>;
    updateGroupById: (groupId: string | Types.ObjectId, data: Partial<Pick<IGroup, 'name' | 'description' | 'email' | 'avatar'>>, session?: ClientSession) => Promise<IGroup | null>;
    deleteGroup: (groupId: string | Types.ObjectId, session?: ClientSession) => Promise<IGroup | null>;
    addUserToGroup: (userId: string | Types.ObjectId, groupId: string | Types.ObjectId, session?: ClientSession) => Promise<{
        user: IUser;
        group: IGroup | null;
    }>;
    removeUserFromGroup: (userId: string | Types.ObjectId, groupId: string | Types.ObjectId, session?: ClientSession) => Promise<{
        user: IUser;
        group: IGroup | null;
    }>;
    removeMemberById: (groupId: string | Types.ObjectId, memberId: string, session?: ClientSession) => Promise<IGroup | null>;
    findUsers: (searchCriteria: FilterQuery<IUser>, fieldsToSelect?: string | string[] | null) => Promise<IUser[]>;
    deleteConfig: (principalType: PrincipalType, principalId: string | Types.ObjectId) => Promise<IConfig | null>;
    deleteAclEntries: (filter: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId;
    }) => Promise<DeleteResult>;
}
export declare function createAdminGroupsHandlers(deps: AdminGroupsDeps): {
    listGroups: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getGroup: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    createGroup: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateGroup: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteGroup: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getGroupMembers: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    addGroupMember: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    removeGroupMember: (req: ServerRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export {};
//# sourceMappingURL=groups.d.ts.map