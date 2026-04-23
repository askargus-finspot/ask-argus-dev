import { TokenExchangeMethodEnum } from 'askargus-data-provider';
type ClientAuthMethod = 'client_secret_basic' | 'client_secret_post' | 'none';
/** Maps a user-facing `TokenExchangeMethodEnum` to an OAuth auth method string. */
export declare function getForcedTokenEndpointAuthMethod(tokenExchangeMethod?: TokenExchangeMethodEnum): 'client_secret_basic' | 'client_secret_post' | undefined;
/**
 * Selects the auth method to request during dynamic client registration.
 *
 * Priority:
 * 1. Forced override from `tokenExchangeMethod` config
 * 2. First credential-based method from server's advertised list (skips `none` per RFC 7591 —
 *    `none` declares a public client, which is incorrect for DCR with a generated secret)
 * 3. `none` if the server only advertises `none`
 * 4. Server's first listed method (unsupported exotic method — best-effort)
 * 5. Falls through to `undefined` (caller keeps its default)
 */
export declare function selectRegistrationAuthMethod(serverAdvertised: string[] | undefined, tokenExchangeMethod?: TokenExchangeMethodEnum): string | undefined;
/**
 * Resolves the auth method for token endpoint requests (refresh, pre-configured flows).
 *
 * Priority:
 * 1. Forced override from `tokenExchangeMethod` config
 * 2. Preferred method from client registration response (`clientInfo.token_endpoint_auth_method`)
 * 3. First match from server's advertised methods
 */
export declare function resolveTokenEndpointAuthMethod(options: {
    tokenExchangeMethod?: TokenExchangeMethodEnum;
    tokenAuthMethods: string[];
    preferredMethod?: string;
}): 'client_secret_basic' | 'client_secret_post' | undefined;
/**
 * Infers the client auth method from request state when `clientInfo.token_endpoint_auth_method`
 * is not set. Used inside the fetch wrapper to determine how credentials were applied by the SDK.
 *
 * Per RFC 8414 Section 2, defaults to `client_secret_basic` for confidential clients.
 */
export declare function inferClientAuthMethod(hasAuthorizationHeader: boolean, hasBodyClientId: boolean, hasBodyClientSecret: boolean, hasClientSecret: boolean): ClientAuthMethod;
export {};
//# sourceMappingURL=methods.d.ts.map