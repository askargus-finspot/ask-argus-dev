import type { RequestOptions } from '@modelcontextprotocol/sdk/shared/protocol.js';
import type { TokenMethods, IUser } from '@askargus/data-schemas';
import type { GraphTokenResolver } from '~/utils/graph';
import type { FlowStateManager } from '~/flow/manager';
import type { MCPOAuthTokens } from './oauth';
import type { RequestBody } from '~/types';
import type * as t from './types';
import { UserConnectionManager } from './UserConnectionManager';
import { MCPConnection } from './connection';
/**
 * Centralized manager for MCP server connections and tool execution.
 * Extends UserConnectionManager to handle both app-level and user-specific connections.
 */
export declare class MCPManager extends UserConnectionManager {
    private static instance;
    /** Creates and initializes the singleton MCPManager instance */
    static createInstance(configs: t.MCPServers): Promise<MCPManager>;
    /** Returns the singleton MCPManager instance */
    static getInstance(): MCPManager;
    /** Initializes the MCPManager by setting up server registry and app connections */
    initialize(configs: t.MCPServers): Promise<void>;
    /** Retrieves an app-level or user-specific connection based on provided arguments */
    getConnection(args: {
        serverName: string;
        user?: IUser;
        forceNew?: boolean;
        flowManager?: FlowStateManager<MCPOAuthTokens | null>;
        /** Pre-resolved config for config-source servers not in YAML/DB */
        serverConfig?: t.ParsedServerConfig;
    } & Omit<t.OAuthConnectionOptions, 'useOAuth' | 'user' | 'flowManager'>): Promise<MCPConnection>;
    /**
     * Discovers tools from an MCP server, even when OAuth is required.
     * Per MCP spec, tool listing should be possible without authentication.
     * Use this for agent initialization to get tool schemas before OAuth flow.
     */
    discoverServerTools(args: t.ToolDiscoveryOptions): Promise<t.ToolDiscoveryResult>;
    /** Returns all available tool functions from app-level connections */
    getAppToolFunctions(): Promise<t.LCAvailableTools>;
    /** Returns all available tool functions from all connections available to user */
    getServerToolFunctions(userId: string, serverName: string): Promise<t.LCAvailableTools | null>;
    /**
     * Get instructions for MCP servers
     * @param serverNames Optional array of server names. If not provided or empty, returns all servers.
     * @returns Object mapping server names to their instructions
     */
    private getInstructions;
    /**
     * Format MCP server instructions for injection into context
     * @param serverNames Optional array of server names to include. If not provided, includes all servers.
     * @returns Formatted instructions string ready for context injection
     */
    formatInstructionsForContext(serverNames?: string[], configServers?: Record<string, t.ParsedServerConfig>): Promise<string>;
    /**
     * Calls a tool on an MCP server, using either a user-specific connection
     * (if userId is provided) or an app-level connection. Updates the last activity timestamp
     * for user-specific connections upon successful call initiation.
     *
     * @param graphTokenResolver - Optional function to resolve Graph API tokens via OBO flow.
     *   When provided and the server config contains `{{ASKARGUS_GRAPH_ACCESS_TOKEN}}` placeholders,
     *   they will be resolved to actual Graph API tokens before the tool call.
     */
    callTool({ user, serverName, serverConfig: providedConfig, toolName, provider, toolArguments, options, tokenMethods, requestBody, flowManager, oauthStart, oauthEnd, customUserVars, graphTokenResolver, }: {
        user?: IUser;
        serverName: string;
        /** Pre-resolved config from tool creation context — avoids readThrough TTL and cross-tenant issues */
        serverConfig?: t.ParsedServerConfig;
        toolName: string;
        provider: t.Provider;
        toolArguments?: Record<string, unknown>;
        options?: RequestOptions;
        requestBody?: RequestBody;
        tokenMethods?: TokenMethods;
        customUserVars?: Record<string, string>;
        flowManager: FlowStateManager<MCPOAuthTokens | null>;
        oauthStart?: (authURL: string) => Promise<void>;
        oauthEnd?: () => Promise<void>;
        graphTokenResolver?: GraphTokenResolver;
    }): Promise<t.FormattedToolResponse>;
}
//# sourceMappingURL=MCPManager.d.ts.map