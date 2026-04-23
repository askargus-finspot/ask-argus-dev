import type { Request, Response, NextFunction } from 'express';
export declare const OAUTH_CSRF_COOKIE = "oauth_csrf";
export declare const OAUTH_CSRF_MAX_AGE: number;
export declare const OAUTH_SESSION_COOKIE = "oauth_session";
export declare const OAUTH_SESSION_MAX_AGE: number;
export declare const OAUTH_SESSION_COOKIE_PATH = "/api";
/**
 * Determines if secure cookies should be used.
 * Returns `true` in production unless the server is running on localhost (HTTP).
 * This allows cookies to work on `http://localhost` during local development
 * even when `NODE_ENV=production` (common in Docker Compose setups).
 */
export declare function shouldUseSecureCookie(): boolean;
/** Generates an HMAC-based token for OAuth CSRF protection */
export declare function generateOAuthCsrfToken(flowId: string, secret?: string): string;
/** Sets a SameSite=Lax CSRF cookie bound to a specific OAuth flow */
export declare function setOAuthCsrfCookie(res: Response, flowId: string, cookiePath: string): void;
/**
 * Validates the per-flow CSRF cookie against the expected HMAC.
 * Uses timing-safe comparison and always clears the cookie to prevent replay.
 */
export declare function validateOAuthCsrf(req: Request, res: Response, flowId: string, cookiePath: string): boolean;
/**
 * Express middleware that sets the OAuth session cookie after JWT authentication.
 * Chain after requireJwtAuth on routes that precede an OAuth redirect (e.g., reinitialize, bind).
 */
export declare function setOAuthSession(req: Request, res: Response, next: NextFunction): void;
/** Sets a SameSite=Lax session cookie that binds the browser to the authenticated userId */
export declare function setOAuthSessionCookie(res: Response, userId: string): void;
/** Validates the session cookie against the expected userId using timing-safe comparison */
export declare function validateOAuthSession(req: Request, userId: string): boolean;
//# sourceMappingURL=csrf.d.ts.map