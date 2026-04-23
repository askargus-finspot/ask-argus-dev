import type { IUser } from '@askargus/data-schemas';
/**
 * Response from a Graph API token exchange.
 */
export interface GraphTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}
/**
 * Function type for resolving Graph API tokens via OBO flow.
 * This function is injected from the main API layer since it requires
 * access to OpenID configuration and caching services.
 */
export type GraphTokenResolver = (user: IUser, accessToken: string, scopes: string, fromCache?: boolean) => Promise<GraphTokenResponse>;
/**
 * Options for processing Graph token placeholders.
 */
export interface GraphTokenOptions {
    user?: IUser;
    graphTokenResolver?: GraphTokenResolver;
    scopes?: string;
}
/**
 * Checks if a string contains the Graph token placeholder.
 * @param value - The string to check
 * @returns True if the placeholder is present
 */
export declare function containsGraphTokenPlaceholder(value: string): boolean;
/**
 * Checks if any value in a record contains the Graph token placeholder.
 * @param record - The record to check (e.g., headers, env vars)
 * @returns True if any value contains the placeholder
 */
export declare function recordContainsGraphTokenPlaceholder(record: Record<string, string> | undefined): boolean;
/**
 * Checks if MCP options contain the Graph token placeholder in headers, env, or url.
 * @param options - The MCP options object
 * @returns True if any field contains the placeholder
 */
export declare function mcpOptionsContainGraphTokenPlaceholder(options: {
    headers?: Record<string, string>;
    env?: Record<string, string>;
    url?: string;
}): boolean;
/**
 * Asynchronously resolves Graph token placeholders in a string.
 * This function must be called before the synchronous processMCPEnv pipeline.
 *
 * @param value - The string containing the placeholder
 * @param options - Options including user and graph token resolver
 * @returns The string with Graph token placeholder replaced
 */
export declare function resolveGraphTokenPlaceholder(value: string, options: GraphTokenOptions): Promise<string>;
/**
 * Asynchronously resolves Graph token placeholders in a record of string values.
 *
 * @param record - The record containing placeholders (e.g., headers)
 * @param options - Options including user and graph token resolver
 * @returns The record with Graph token placeholders replaced
 */
export declare function resolveGraphTokensInRecord(record: Record<string, string> | undefined, options: GraphTokenOptions): Promise<Record<string, string> | undefined>;
/**
 * Pre-processes MCP options to resolve Graph token placeholders.
 * This must be called before processMCPEnv since Graph token resolution is async.
 *
 * @param options - The MCP options object
 * @param graphOptions - Options for Graph token resolution
 * @returns The options with Graph token placeholders resolved
 */
export declare function preProcessGraphTokens<T extends {
    headers?: Record<string, string>;
    env?: Record<string, string>;
    url?: string;
}>(options: T, graphOptions: GraphTokenOptions): Promise<T>;
//# sourceMappingURL=graph.d.ts.map