import { EToolResources } from 'askargus-data-provider';
import type { AgentToolResources, AgentToolOptions, TEndpointOption, Agent } from 'askargus-data-provider';
import type { GenericTool, LCToolRegistry, ToolMap, LCTool } from '@askargus/agents';
import type { Response as ServerResponse } from 'express';
import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest, EndpointDbMethods } from '~/types';
import type { TFilterFilesByAgentAccess } from './resources';
/**
 * Extended agent type with additional fields needed after initialization
 */
export type InitializedAgent = Agent & {
    tools: GenericTool[];
    attachments: IMongoFile[];
    toolContextMap: Record<string, unknown>;
    maxContextTokens: number;
    /** Pre-ratio context budget (agentMaxContextNum - maxOutputTokensNum). Used by createRun to apply a configurable reserve ratio. */
    baseContextTokens?: number;
    useLegacyContent: boolean;
    resendFiles: boolean;
    tool_resources?: AgentToolResources;
    userMCPAuthMap?: Record<string, Record<string, string>>;
    /** Tool map for ToolNode to use when executing tools (required for PTC) */
    toolMap?: ToolMap;
    /** Tool registry for PTC and tool search (only present when MCP tools with env classification exist) */
    toolRegistry?: LCToolRegistry;
    /** Serializable tool definitions for event-driven execution */
    toolDefinitions?: LCTool[];
    /** Precomputed flag indicating if any tools have defer_loading enabled (for efficient runtime checks) */
    hasDeferredTools?: boolean;
    /** Whether the actions capability is enabled (resolved during tool loading) */
    actionsEnabled?: boolean;
    /** Maximum characters allowed in a single tool result before truncation. */
    maxToolResultChars?: number;
};
/**
 * Parameters for initializing an agent
 * Matches the CJS signature from api/server/services/Endpoints/agents/agent.js
 */
export interface InitializeAgentParams {
    /** Request object */
    req: ServerRequest;
    /** Response object */
    res: ServerResponse;
    /** Agent to initialize */
    agent: Agent;
    /** Conversation ID (optional) */
    conversationId?: string | null;
    /** Parent message ID for determining the current thread (optional) */
    parentMessageId?: string | null;
    /** Request files */
    requestFiles?: IMongoFile[];
    /** Function to load agent tools */
    loadTools?: (params: {
        req: ServerRequest;
        res: ServerResponse;
        provider: string;
        agentId: string;
        tools: string[];
        model: string | null;
        tool_options: AgentToolOptions | undefined;
        tool_resources: AgentToolResources | undefined;
    }) => Promise<{
        /** Full tool instances (only present when definitionsOnly=false) */
        tools?: GenericTool[];
        toolContextMap?: Record<string, unknown>;
        userMCPAuthMap?: Record<string, Record<string, string>>;
        toolRegistry?: LCToolRegistry;
        /** Serializable tool definitions for event-driven mode */
        toolDefinitions?: LCTool[];
        hasDeferredTools?: boolean;
        actionsEnabled?: boolean;
    } | null>;
    /** Endpoint option (contains model_parameters and endpoint info) */
    endpointOption?: Partial<TEndpointOption>;
    /** Set of allowed providers */
    allowedProviders: Set<string>;
    /** Whether this is the initial agent */
    isInitialAgent?: boolean;
}
/**
 * Database methods required for agent initialization
 * Most methods come from data-schemas via createMethods()
 * getConvoFiles not yet in data-schemas but included here for consistency
 */
export interface InitializeAgentDbMethods extends EndpointDbMethods {
    /** Update usage tracking for multiple files */
    updateFilesUsage: (files: Array<{
        file_id: string;
    }>, fileIds?: string[]) => Promise<unknown[]>;
    /** Get files from database */
    getFiles: (filter: unknown, sort: unknown, select: unknown) => Promise<unknown[]>;
    /** Filter files by agent access permissions (ownership or agent attachment) */
    filterFilesByAgentAccess?: TFilterFilesByAgentAccess;
    /** Get tool files by IDs (user-uploaded files only, code files handled separately) */
    getToolFilesByIds: (fileIds: string[], toolSet: Set<EToolResources>) => Promise<unknown[]>;
    /** Get conversation file IDs */
    getConvoFiles: (conversationId: string) => Promise<string[] | null>;
    /** Get code-generated files by conversation ID and optional message IDs */
    getCodeGeneratedFiles?: (conversationId: string, messageIds?: string[]) => Promise<unknown[]>;
    /** Get user-uploaded execute_code files by file IDs (from message.files in thread) */
    getUserCodeFiles?: (fileIds: string[]) => Promise<unknown[]>;
    /** Get messages for a conversation (supports select for field projection) */
    getMessages?: (filter: {
        conversationId: string;
    }, select?: string) => Promise<Array<{
        messageId: string;
        parentMessageId?: string;
        files?: Array<{
            file_id: string;
        }>;
    }> | null>;
}
/**
 * Initializes an agent for use in requests.
 * Handles file processing, tool loading, provider configuration, and context token calculations.
 *
 * This function is exported from @askargus/api and replaces the CJS version from
 * api/server/services/Endpoints/agents/agent.js
 *
 * @param params - Initialization parameters
 * @param deps - Optional dependency injection for testing
 * @returns Promise resolving to initialized agent with tools and configuration
 * @throws Error if agent provider is not allowed or if required dependencies are missing
 */
export declare function initializeAgent(params: InitializeAgentParams, db?: InitializeAgentDbMethods): Promise<InitializedAgent>;
//# sourceMappingURL=initialize.d.ts.map