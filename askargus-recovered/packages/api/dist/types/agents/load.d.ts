import type { AppConfig } from '@askargus/data-schemas';
import type { AgentModelParameters, TEphemeralAgent, Agent } from 'askargus-data-provider';
export interface LoadAgentDeps {
    getAgent: (searchParameter: {
        id: string;
    }) => Promise<Agent | null>;
    getMCPServerTools: (userId: string, serverName: string) => Promise<Record<string, unknown> | null>;
}
export interface LoadAgentParams {
    req: {
        user?: {
            id?: string;
        };
        config?: AppConfig;
        body?: {
            promptPrefix?: string;
            ephemeralAgent?: TEphemeralAgent;
        };
    };
    spec?: string;
    agent_id: string;
    endpoint: string;
    model_parameters?: AgentModelParameters & {
        model?: string;
    };
}
/**
 * Load an ephemeral agent based on the request parameters.
 */
export declare function loadEphemeralAgent({ req, spec, endpoint, model_parameters: _m }: Omit<LoadAgentParams, 'agent_id'>, deps: LoadAgentDeps): Promise<Agent | null>;
/**
 * Load an agent based on the provided ID.
 * For ephemeral agents, builds a synthetic agent from request parameters.
 * For persistent agents, fetches from the database.
 */
export declare function loadAgent(params: LoadAgentParams, deps: LoadAgentDeps): Promise<Agent | null>;
//# sourceMappingURL=load.d.ts.map