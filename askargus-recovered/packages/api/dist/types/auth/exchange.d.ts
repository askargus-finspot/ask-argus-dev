import { Keyv } from 'keyv';
import type { IUser } from '@askargus/data-schemas';
/**
 * Gets the admin panel URL from environment or falls back to default.
 * @returns The admin panel URL
 */
export declare function getAdminPanelUrl(): string;
/**
 * User data stored in the exchange cache
 */
export interface AdminExchangeUser {
    _id: string;
    id: string;
    email: string;
    name: string;
    username: string;
    role: string;
    avatar?: string;
    provider?: string;
    openidId?: string;
}
/**
 * Data stored in cache for admin OAuth exchange
 */
export interface AdminExchangeData {
    userId: string;
    user: AdminExchangeUser;
    token: string;
    refreshToken?: string;
    origin?: string;
    codeChallenge?: string;
}
/**
 * Response from the exchange endpoint
 */
export interface AdminExchangeResponse {
    token: string;
    refreshToken?: string;
    user: AdminExchangeUser;
}
/**
 * Serializes user data for the exchange cache.
 * @param user - The authenticated user object
 * @returns Serialized user data for admin panel
 */
export declare function serializeUserForExchange(user: IUser): AdminExchangeUser;
/**
 * Verifies a PKCE code_verifier against a stored code_challenge.
 * Uses hex-encoded SHA-256 comparison (not RFC 7636 S256 which uses base64url).
 * @param verifier - The code_verifier provided during exchange
 * @param challenge - The hex-encoded SHA-256 code_challenge stored during code generation
 * @returns True if the verifier matches the challenge
 */
export declare function verifyCodeChallenge(verifier: string, challenge: string): boolean;
/**
 * Generates an exchange code and stores user data for admin panel OAuth flow.
 * @param cache - The Keyv cache instance for storing exchange data
 * @param user - The authenticated user object
 * @param token - The JWT access token
 * @param refreshToken - Optional refresh token for OpenID users
 * @param origin - The admin panel origin (scheme://host:port) for origin binding
 * @param codeChallenge - PKCE code_challenge (hex-encoded SHA-256 of code_verifier)
 * @returns The generated exchange code
 */
export declare function generateAdminExchangeCode(cache: Keyv, user: IUser, token: string, refreshToken?: string, origin?: string, codeChallenge?: string): Promise<string>;
/**
 * Exchanges an authorization code for tokens and user data.
 * The code is deleted immediately after retrieval (one-time use).
 * @param cache - The Keyv cache instance for retrieving exchange data
 * @param code - The authorization code to exchange
 * @param requestOrigin - The origin of the requesting client for origin binding
 * @param codeVerifier - PKCE code_verifier to verify against the stored code_challenge
 * @returns The exchange response with token, refreshToken, and user data, or null if invalid/expired
 */
export declare function exchangeAdminCode(cache: Keyv, code: string, requestOrigin?: string, codeVerifier?: string): Promise<AdminExchangeResponse | null>;
/** PKCE challenge cache TTL: 5 minutes (enough for user to authenticate with IdP) */
export declare const PKCE_CHALLENGE_TTL: number;
/** Regex pattern for valid PKCE challenges: 64 hex characters (SHA-256 hex digest) */
export declare const PKCE_CHALLENGE_PATTERN: RegExp;
/** Minimal request shape needed by {@link stripCodeChallenge}. */
export interface PkceStrippableRequest {
    query: Record<string, unknown>;
    originalUrl: string;
    url: string;
}
/**
 * Strips `code_challenge` from the request query and URL strings.
 *
 * openid-client v6's Passport Strategy uses `currentUrl.searchParams.size === 0`
 * to distinguish an initial authorization request from an OAuth callback.
 * The admin-panel-specific `code_challenge` query parameter would cause the
 * strategy to misclassify the request as a callback and return 401.
 *
 * Applied defensively to all providers to ensure the admin-panel-private
 * `code_challenge` parameter never reaches any Passport strategy.
 */
export declare function stripCodeChallenge(req: PkceStrippableRequest): void;
/**
 * Stores the admin-panel PKCE challenge in cache, then strips `code_challenge`
 * from the request so it doesn't interfere with the Passport strategy.
 *
 * Must be called before `passport.authenticate()` — the two operations are
 * logically atomic: read the challenge from the query, persist it, then remove
 * the parameter from the request URL.
 * @param cache - The Keyv cache instance for storing PKCE challenges.
 * @param req - The Express request to read and mutate.
 * @param state - The OAuth state value (cache key).
 * @param provider - Provider name for logging.
 * @returns True if stored (or no challenge provided); false on cache failure.
 */
export declare function storeAndStripChallenge(cache: Keyv, req: PkceStrippableRequest, state: string, provider: string): Promise<boolean>;
/**
 * Checks if the redirect URI is for the admin panel (cross-origin).
 * Uses proper URL parsing to compare origins, handling edge cases where
 * both URLs might share the same prefix (e.g., localhost:3000 vs localhost:3001).
 *
 * @param redirectUri - The redirect URI to check.
 * @param adminPanelUrl - The admin panel URL (defaults to ADMIN_PANEL_URL env var)
 * @param domainClient - The main client domain
 * @returns True if redirecting to admin panel (different origin from main client).
 */
export declare function isAdminPanelRedirect(redirectUri: string, adminPanelUrl: string, domainClient: string): boolean;
//# sourceMappingURL=exchange.d.ts.map