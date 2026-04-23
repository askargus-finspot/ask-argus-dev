import { type MCPOptions } from 'askargus-data-provider';
import type { TokenMethods } from '@askargus/data-schemas';
import type { FlowStateManager } from '~/flow/manager';
import type { OAuthClientInformation, MCPOAuthFlowMetadata, MCPOAuthTokens } from './types';
export declare class MCPOAuthHandler {
    private static readonly FLOW_TYPE;
    private static readonly FLOW_TTL;
    /**
     * Creates a fetch function with custom headers injected
     */
    private static createOAuthFetch;
    /**
     * Discovers OAuth metadata from the server
     */
    private static discoverMetadata;
    /**
     * Discovers OAuth authorization server metadata, retrying with just the origin
     * when discovery fails for a path-based URL. Shared implementation used by
     * `discoverMetadata` and both `refreshOAuthTokens` branches.
     */
    private static discoverWithOriginFallback;
    /**
     * Registers an OAuth client dynamically
     */
    private static registerOAuthClient;
    /**
     * Initiates the OAuth flow for an MCP server
     */
    static initiateOAuthFlow(serverName: string, serverUrl: string, userId: string, oauthHeaders: Record<string, string>, config?: MCPOptions['oauth'], allowedDomains?: string[] | null, findToken?: TokenMethods['findToken']): Promise<{
        authorizationUrl: string;
        flowId: string;
        flowMetadata: MCPOAuthFlowMetadata;
    }>;
    /**
     * Completes the OAuth flow by exchanging the authorization code for tokens.
     *
     * `allowedDomains` is intentionally absent: all URLs used here (serverUrl,
     * token_endpoint) originate from {@link MCPOAuthFlowMetadata} that was
     * SSRF-validated during {@link initiateOAuthFlow}. No new URL resolution occurs.
     */
    static completeOAuthFlow(flowId: string, authorizationCode: string, flowManager: FlowStateManager<MCPOAuthTokens>, oauthHeaders: Record<string, string>): Promise<MCPOAuthTokens>;
    /**
     * Gets the OAuth flow metadata
     */
    static getFlowState(flowId: string, flowManager: FlowStateManager<MCPOAuthTokens>): Promise<MCPOAuthFlowMetadata | null>;
    /**
     * Generates a flow ID for the OAuth flow
     * @returns Consistent ID so concurrent requests share the same flow
     */
    static generateFlowId(userId: string, serverName: string): string;
    /**
     * Generates a secure state parameter
     */
    private static generateState;
    /**
     * Validates an OAuth URL is not targeting a private/internal address.
     * Skipped when the full URL (hostname + protocol + port) matches an admin-trusted
     * allowedDomains entry, honoring protocol/port constraints when the admin specifies them.
     */
    private static validateOAuthUrl;
    private static readonly STATE_MAP_TYPE;
    /**
     * Stores a mapping from the opaque OAuth state parameter to the flowId.
     * This allows the callback to resolve the flowId from an unguessable state
     * value, preventing attackers from forging callback requests.
     */
    static storeStateMapping(state: string, flowId: string, flowManager: FlowStateManager<MCPOAuthTokens | null>): Promise<void>;
    /**
     * Resolves an opaque OAuth state parameter back to the original flowId.
     * Returns null if the state is not found (expired or never stored).
     */
    static resolveStateToFlowId(state: string, flowManager: FlowStateManager<MCPOAuthTokens | null>): Promise<string | null>;
    /**
     * Deletes an orphaned state mapping when a flow is replaced.
     * Prevents old authorization URLs from resolving after a flow restart.
     */
    static deleteStateMapping(state: string, flowManager: FlowStateManager<MCPOAuthTokens | null>): Promise<void>;
    /**
     * Gets the default redirect URI for a server
     */
    private static getDefaultRedirectUri;
    /**
     * Processes and logs a token refresh response from an OAuth server.
     * Normalizes the response to MCPOAuthTokens format and logs debug info about refresh token rotation.
     */
    private static processRefreshResponse;
    /**
     * Refreshes OAuth tokens using a refresh token
     */
    static refreshOAuthTokens(refreshToken: string, metadata: {
        serverName: string;
        serverUrl?: string;
        clientInfo?: OAuthClientInformation;
        storedTokenEndpoint?: string;
        storedAuthMethods?: string[];
    }, oauthHeaders: Record<string, string>, config?: MCPOptions['oauth'], allowedDomains?: string[] | null): Promise<MCPOAuthTokens>;
    /**
     * Revokes OAuth tokens at the authorization server (RFC 7009)
     */
    static revokeOAuthToken(serverName: string, token: string, tokenType: 'refresh' | 'access', metadata: {
        serverUrl: string;
        clientId: string;
        clientSecret: string;
        revocationEndpoint?: string;
        revocationEndpointAuthMethodsSupported?: string[];
    }, oauthHeaders?: Record<string, string>, allowedDomains?: string[] | null): Promise<void>;
}
//# sourceMappingURL=handler.d.ts.map