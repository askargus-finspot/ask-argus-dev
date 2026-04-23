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
import type { FilterQuery, Types } from 'mongoose';
import type { IAgent } from '~/types';
export interface AgentDeps {
    /** Removes all ACL permissions for a resource. Injected from PermissionService. */
    removeAllPermissions: (params: {
        resourceType: string;
        resourceId: unknown;
    }) => Promise<void>;
    /** Gets actions. Created by createActionMethods. */
    getActions: (searchParams: FilterQuery<unknown>, includeSensitive?: boolean) => Promise<unknown[]>;
    /** Returns resource IDs solely owned by the given user. From createAclEntryMethods. */
    getSoleOwnedResourceIds: (userObjectId: Types.ObjectId, resourceTypes: string | string[]) => Promise<Types.ObjectId[]>;
}
/**
 * Generates a hash of action metadata for version comparison.
 */
declare function generateActionMetadataHash(actionIds: string[] | null | undefined, actions: Array<{
    action_id: string;
    metadata: Record<string, unknown> | null;
}>): Promise<string>;
export declare function createAgentMethods(mongoose: typeof import('mongoose'), deps: AgentDeps): {
    getAgent: (searchParameter: FilterQuery<IAgent>) => Promise<IAgent | null>;
    getAgents: (searchParameter: FilterQuery<IAgent>) => Promise<IAgent[]>;
    createAgent: (agentData: Record<string, unknown>) => Promise<IAgent>;
    updateAgent: (searchParameter: FilterQuery<IAgent>, updateData: Record<string, unknown>, options?: {
        updatingUserId?: string | null;
        forceVersion?: boolean;
        skipVersioning?: boolean;
    }) => Promise<IAgent | null>;
    deleteAgent: (searchParameter: FilterQuery<IAgent>) => Promise<IAgent | null>;
    deleteUserAgents: (userId: string) => Promise<void>;
    revertAgentVersion: (searchParameter: FilterQuery<IAgent>, versionIndex: number) => Promise<IAgent>;
    countPromotedAgents: () => Promise<number>;
    addAgentResourceFile: ({ agent_id, tool_resource, file_id, updatingUserId, }: {
        agent_id: string;
        tool_resource: string;
        file_id: string;
        updatingUserId?: string | undefined;
    }) => Promise<IAgent>;
    getListAgentsByAccess: ({ accessibleIds, otherParams, limit, after, }: {
        accessibleIds?: Types.ObjectId[] | undefined;
        otherParams?: Record<string, unknown> | undefined;
        limit?: number | null | undefined;
        after?: string | null | undefined;
    }) => Promise<{
        object: string;
        data: Array<Record<string, unknown>>;
        first_id: string | null;
        last_id: string | null;
        has_more: boolean;
        after: string | null;
    }>;
    removeAgentResourceFiles: ({ agent_id, files, }: {
        agent_id: string;
        files: Array<{
            tool_resource: string;
            file_id: string;
        }>;
    }) => Promise<IAgent>;
    generateActionMetadataHash: typeof generateActionMetadataHash;
    removeAgentFromUserFavorites: (resourceId: string, userIds: string[]) => Promise<void>;
};
export type AgentMethods = ReturnType<typeof createAgentMethods>;
export {};
