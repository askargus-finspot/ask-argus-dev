import type { IUser } from '@askargus/data-schemas';
export interface OpenIDTokenInfo {
    accessToken?: string;
    idToken?: string;
    expiresAt?: number;
    userId?: string;
    userEmail?: string;
    userName?: string;
    claims?: Record<string, unknown>;
}
/**
 * Placeholder for Microsoft Graph API access token.
 * This placeholder is resolved asynchronously via OBO (On-Behalf-Of) flow
 * and requires special handling outside the synchronous processMCPEnv pipeline.
 */
export declare const GRAPH_TOKEN_PLACEHOLDER = "{{ASKARGUS_GRAPH_ACCESS_TOKEN}}";
/**
 * Default Microsoft Graph API scopes for OBO token exchange.
 * Can be overridden via GRAPH_API_SCOPES environment variable.
 */
export declare const DEFAULT_GRAPH_SCOPES = "https://graph.microsoft.com/.default";
export declare function extractOpenIDTokenInfo(user: Partial<IUser> | null | undefined): OpenIDTokenInfo | null;
export declare function isOpenIDTokenValid(tokenInfo: OpenIDTokenInfo | null): boolean;
export declare function processOpenIDPlaceholders(value: string, tokenInfo: OpenIDTokenInfo | null): string;
export declare function createBearerAuthHeader(tokenInfo: OpenIDTokenInfo | null): string;
export declare function isOpenIDAvailable(): boolean;
//# sourceMappingURL=oidc.d.ts.map