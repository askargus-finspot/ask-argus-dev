import type { OAuthClientInformation } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { TokenMethods } from '@askargus/data-schemas';
import type { MCPOAuthTokens, OAuthMetadata } from '~/mcp/oauth';
import type { FlowStateManager } from '~/flow/manager';
import type * as t from './types';
import { MCPConnection } from './connection';
export interface ToolDiscoveryResult {
    tools: Tool[] | null;
    connection: MCPConnection | null;
    oauthRequired: boolean;
    oauthUrl: string | null;
}
/**
 * Factory for creating MCP connections with optional OAuth authentication.
 * Handles OAuth flows, token management, and connection retry logic.
 * NOTE: Much of the OAuth logic was extracted from the old MCPManager class as is.
 */
export declare class MCPConnectionFactory {
    protected readonly serverName: string;
    protected readonly serverConfig: t.MCPOptions;
    protected readonly logPrefix: string;
    protected readonly useOAuth: boolean;
    protected readonly useSSRFProtection: boolean;
    protected readonly allowedDomains?: string[] | null;
    protected readonly userId?: string;
    protected readonly flowManager?: FlowStateManager<MCPOAuthTokens | null>;
    protected readonly tokenMethods?: TokenMethods;
    protected readonly signal?: AbortSignal;
    protected readonly oauthStart?: (authURL: string) => Promise<void>;
    protected readonly oauthEnd?: () => Promise<void>;
    protected readonly returnOnOAuth?: boolean;
    protected readonly connectionTimeout?: number;
    /** Creates a new MCP connection with optional OAuth support */
    static create(basic: t.BasicConnectionOptions, oauth?: t.OAuthConnectionOptions): Promise<MCPConnection>;
    /**
     * Discovers tools from an MCP server, even when OAuth is required.
     * Per MCP spec, tool listing should be possible without authentication.
     * Returns tools if discoverable, plus OAuth status for tool execution.
     */
    static discoverTools(basic: t.BasicConnectionOptions, options?: Omit<t.OAuthConnectionOptions, 'returnOnOAuth'> | t.UserConnectionContext): Promise<ToolDiscoveryResult>;
    protected discoverToolsInternal(): Promise<ToolDiscoveryResult>;
    protected attemptUnauthenticatedToolListing(): Promise<Tool[] | null>;
    protected constructor(basic: t.BasicConnectionOptions, options?: t.OAuthConnectionOptions | t.UserConnectionContext);
    /** Creates the base MCP connection with OAuth tokens */
    protected createConnection(): Promise<MCPConnection>;
    /** Retrieves existing OAuth tokens from storage or returns null */
    protected getOAuthTokens(): Promise<MCPOAuthTokens | null>;
    /** Creates a function to refresh OAuth tokens when they expire */
    protected createRefreshTokensFunction(): (refreshToken: string, metadata: {
        userId: string;
        serverName: string;
        identifier: string;
        clientInfo?: OAuthClientInformation;
        storedTokenEndpoint?: string;
        storedAuthMethods?: string[];
    }) => Promise<MCPOAuthTokens>;
    /** Sets up OAuth event handlers for the connection */
    protected handleOAuthEvents(connection: MCPConnection): () => void;
    /** Attempts to establish connection with timeout handling */
    protected attemptToConnect(connection: MCPConnection): Promise<void>;
    private connectTo;
    /** Clears stored client registration if the error indicates client rejection */
    private clearStaleClientIfRejected;
    /**
     * Checks whether an error indicates the OAuth client registration was rejected.
     * Includes RFC 6749 §5.2 standard codes (`invalid_client`, `unauthorized_client`)
     * and known vendor-specific patterns (Okta: `client_id mismatch`, Auth0: `client not found`,
     * generic: `unknown client`).
     */
    static isClientRejection(error: unknown): boolean;
    private isOAuthError;
    /** Manages OAuth flow initiation and completion */
    protected handleOAuthRequired(): Promise<{
        tokens: MCPOAuthTokens | null;
        clientInfo?: OAuthClientInformation;
        metadata?: OAuthMetadata;
        reusedStoredClient?: boolean;
        error?: unknown;
    } | null>;
}
//# sourceMappingURL=MCPConnectionFactory.d.ts.map