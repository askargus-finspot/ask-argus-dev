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
import { DEFAULT_REFRESH_TOKEN_EXPIRY, type SessionMethods } from './session';
import { type TokenMethods } from './token';
import { RoleConflictError } from './role';
import type { RoleMethods, RoleDeps } from './role';
import { DEFAULT_SESSION_EXPIRY, type UserMethods } from './user';
import { type KeyMethods } from './key';
import { type FileMethods } from './file';
import { type MemoryMethods } from './memory';
import { type AgentCategoryMethods } from './agentCategory';
import { type AgentApiKeyMethods } from './agentApiKey';
import { type MCPServerMethods } from './mcpServer';
import { type PluginAuthMethods } from './pluginAuth';
import { type AccessRoleMethods } from './accessRole';
import { type UserGroupMethods } from './userGroup';
import { type AclEntryMethods } from './aclEntry';
import { type SystemGrantMethods } from './systemGrant';
import { type ShareMethods } from './share';
import { type ActionMethods } from './action';
import { type AssistantMethods } from './assistant';
import { type BannerMethods } from './banner';
import { type ToolCallMethods } from './toolCall';
import { type CategoriesMethods } from './categories';
import { type PresetMethods } from './preset';
import { type ConversationTagMethods } from './conversationTag';
import { type MessageMethods } from './message';
import { type ConversationMethods } from './conversation';
import { type TxMethods, tokenValues, cacheTokenValues, premiumTokenValues, defaultRate } from './tx';
import { type TransactionMethods } from './transaction';
import { type SpendTokensMethods } from './spendTokens';
import { type PromptMethods } from './prompt';
import { type AgentMethods } from './agent';
import { type ConfigMethods } from './config';
export { RoleConflictError, DEFAULT_REFRESH_TOKEN_EXPIRY, DEFAULT_SESSION_EXPIRY };
export { tokenValues, cacheTokenValues, premiumTokenValues, defaultRate };
export type AllMethods = UserMethods & SessionMethods & TokenMethods & RoleMethods & KeyMethods & FileMethods & MemoryMethods & AgentCategoryMethods & AgentApiKeyMethods & MCPServerMethods & UserGroupMethods & AclEntryMethods & SystemGrantMethods & ShareMethods & AccessRoleMethods & PluginAuthMethods & ActionMethods & AssistantMethods & BannerMethods & ToolCallMethods & CategoriesMethods & PresetMethods & ConversationTagMethods & MessageMethods & ConversationMethods & TxMethods & TransactionMethods & SpendTokensMethods & PromptMethods & AgentMethods & ConfigMethods;
/** Dependencies injected from the api layer into createMethods */
export interface CreateMethodsDeps {
    /** Matches a model name to a canonical key. From @askargus/api. */
    matchModelName?: (model: string, endpoint?: string) => string | undefined;
    /** Finds the first key in values whose key is a substring of model. From @askargus/api. */
    findMatchingPattern?: (model: string, values: Record<string, number | Record<string, number>>) => string | undefined;
    /** Removes all ACL permissions for a resource. From PermissionService. */
    removeAllPermissions?: (params: {
        resourceType: string;
        resourceId: unknown;
    }) => Promise<void>;
    /** Returns a cache store for the given key. From getLogStores. */
    getCache?: RoleDeps['getCache'];
}
/**
 * Creates all database methods for all collections
 * @param mongoose - Mongoose instance
 * @param deps - Optional dependencies injected from the api layer
 */
export declare function createMethods(mongoose: typeof import('mongoose'), deps?: CreateMethodsDeps): AllMethods;
export type { UserMethods, SessionMethods, TokenMethods, RoleMethods, KeyMethods, FileMethods, MemoryMethods, AgentCategoryMethods, AgentApiKeyMethods, MCPServerMethods, UserGroupMethods, AclEntryMethods, SystemGrantMethods, ShareMethods, AccessRoleMethods, PluginAuthMethods, ActionMethods, AssistantMethods, BannerMethods, ToolCallMethods, CategoriesMethods, PresetMethods, ConversationTagMethods, MessageMethods, ConversationMethods, TxMethods, TransactionMethods, SpendTokensMethods, PromptMethods, AgentMethods, ConfigMethods, };
