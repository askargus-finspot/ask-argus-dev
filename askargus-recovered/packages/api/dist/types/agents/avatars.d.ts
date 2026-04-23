import type { Agent, AgentAvatar } from 'askargus-data-provider';
declare const MAX_AVATAR_REFRESH_AGENTS = 1000;
declare const AVATAR_REFRESH_BATCH_SIZE = 20;
export { MAX_AVATAR_REFRESH_AGENTS, AVATAR_REFRESH_BATCH_SIZE };
export type RefreshS3UrlFn = (avatar: AgentAvatar) => Promise<string | undefined>;
export type UpdateAgentFn = (searchParams: {
    id: string;
}, updateData: {
    avatar: AgentAvatar;
}, options: {
    updatingUserId: string;
    skipVersioning: boolean;
}) => Promise<unknown>;
export type RefreshListAvatarsParams = {
    agents: Agent[];
    userId: string;
    refreshS3Url: RefreshS3UrlFn;
    updateAgent: UpdateAgentFn;
};
export type RefreshStats = {
    updated: number;
    not_s3: number;
    no_id: number;
    no_change: number;
    s3_error: number;
    persist_error: number;
    /** Maps agentId to the latest valid presigned filepath for re-application on cache hits */
    urlCache: Record<string, string>;
};
/**
 * Opportunistically refreshes S3-backed avatars for agent list responses.
 * Processes agents in batches to prevent database connection pool exhaustion.
 * Only list responses are refreshed because they're the highest-traffic surface and
 * the avatar URLs have a short-lived TTL. The refresh is cached per-user for 30 minutes
 * so we refresh once per interval at most.
 *
 * Any user with VIEW access to an agent can refresh its avatar URL. This ensures
 * avatars remain accessible even when the owner hasn't logged in recently.
 * The agents array should already be filtered to only include agents the user can access.
 */
export declare const refreshListAvatars: ({ agents, userId, refreshS3Url, updateAgent, }: RefreshListAvatarsParams) => Promise<RefreshStats>;
//# sourceMappingURL=avatars.d.ts.map