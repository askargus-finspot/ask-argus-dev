import type { Agent, TConversation } from 'askargus-data-provider';
export declare const ADDED_AGENT_ID = "added_agent";
export interface LoadAddedAgentDeps {
    getAgent: (searchParameter: {
        id: string;
    }) => Promise<Agent | null>;
    getMCPServerTools: (userId: string, serverName: string) => Promise<Record<string, unknown> | null>;
}
interface LoadAddedAgentParams {
    req: {
        user?: {
            id?: string;
        };
        config?: Record<string, unknown>;
    };
    conversation: TConversation | null;
    primaryAgent?: Agent | null;
}
/**
 * Loads an agent from an added conversation (for multi-convo parallel agent execution).
 * Returns the agent config as a plain object, or null if invalid.
 */
export declare function loadAddedAgent({ req, conversation, primaryAgent }: LoadAddedAgentParams, deps: LoadAddedAgentDeps): Promise<Agent | null>;
export {};
//# sourceMappingURL=added.d.ts.map