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
import { Types } from 'mongoose';
import { PrincipalType } from 'askargus-data-provider';
import type { TPrincipalSearchResult } from 'askargus-data-provider';
import type { ClientSession } from 'mongoose';
import type { IGroup, IUser } from '~/types';
export declare function createUserGroupMethods(mongoose: typeof import('mongoose')): {
    findGroupById: (groupId: string | Types.ObjectId, projection?: Record<string, 0 | 1>, session?: ClientSession) => Promise<IGroup | null>;
    findGroupByExternalId: (idOnTheSource: string, source?: 'entra' | 'local', projection?: Record<string, 0 | 1>, session?: ClientSession) => Promise<IGroup | null>;
    findGroupsByNamePattern: (namePattern: string, source?: 'entra' | 'local' | null, limit?: number, session?: ClientSession) => Promise<IGroup[]>;
    findGroupsByMemberId: (userId: string | Types.ObjectId, session?: ClientSession) => Promise<IGroup[]>;
    createGroup: (groupData: Partial<IGroup>, session?: ClientSession) => Promise<IGroup>;
    upsertGroupByExternalId: (idOnTheSource: string, source: 'entra' | 'local', updateData: Partial<IGroup>, session?: ClientSession) => Promise<IGroup | null>;
    addUserToGroup: (userId: string | Types.ObjectId, groupId: string | Types.ObjectId, session?: ClientSession) => Promise<{
        user: IUser;
        group: IGroup | null;
    }>;
    removeUserFromGroup: (userId: string | Types.ObjectId, groupId: string | Types.ObjectId, session?: ClientSession) => Promise<{
        user: IUser;
        group: IGroup | null;
    }>;
    removeUserFromAllGroups: (userId: string | Types.ObjectId) => Promise<void>;
    findGroupByQuery: (filter: Record<string, unknown>, session?: ClientSession) => Promise<IGroup | null>;
    updateGroupById: (groupId: string | Types.ObjectId, data: Record<string, unknown>, session?: ClientSession) => Promise<IGroup | null>;
    bulkUpdateGroups: (filter: Record<string, unknown>, update: Record<string, unknown>, options?: {
        session?: ClientSession;
    }) => Promise<import("mongoose").UpdateWriteOpResult>;
    getUserGroups: (userId: string | Types.ObjectId, session?: ClientSession) => Promise<IGroup[]>;
    getUserPrincipals: (params: {
        userId: string | Types.ObjectId;
        role?: string | null;
    }, session?: ClientSession) => Promise<Array<{
        principalType: PrincipalType;
        principalId?: string | Types.ObjectId;
    }>>;
    syncUserEntraGroups: (userId: string | Types.ObjectId, entraGroups: Array<{
        id: string;
        name: string;
        description?: string;
        email?: string;
    }>, session?: ClientSession) => Promise<{
        user: IUser;
        addedGroups: IGroup[];
        removedGroups: IGroup[];
    }>;
    searchPrincipals: (searchPattern: string, limitPerType?: number, typeFilter?: Array<PrincipalType.USER | PrincipalType.GROUP | PrincipalType.ROLE> | null, session?: ClientSession) => Promise<TPrincipalSearchResult[]>;
    calculateRelevanceScore: (item: TPrincipalSearchResult, searchPattern: string) => number;
    sortPrincipalsByRelevance: <T extends {
        _searchScore?: number | undefined;
        type: string;
        name?: string | undefined;
        email?: string | undefined;
    }>(results: T[]) => T[];
    listGroups: (filter?: {
        source?: 'local' | 'entra';
        search?: string;
        limit?: number;
        offset?: number;
    }, session?: ClientSession) => Promise<IGroup[]>;
    countGroups: (filter?: {
        source?: 'local' | 'entra';
        search?: string;
    }, session?: ClientSession) => Promise<number>;
    deleteGroup: (groupId: string | Types.ObjectId, session?: ClientSession) => Promise<IGroup | null>;
    removeMemberById: (groupId: string | Types.ObjectId, memberId: string, session?: ClientSession) => Promise<IGroup | null>;
};
export type UserGroupMethods = ReturnType<typeof createUserGroupMethods>;
