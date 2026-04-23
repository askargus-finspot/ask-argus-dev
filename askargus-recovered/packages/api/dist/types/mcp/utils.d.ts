import type { ParsedServerConfig } from '~/mcp/types';
export declare const mcpToolPattern: RegExp;
/** Checks that `customUserVars` is present AND non-empty (guards against truthy `{}`) */
export declare function hasCustomUserVars(config: Pick<ParsedServerConfig, 'customUserVars'>): boolean;
/**
 * Determines whether a server config is user-sourced (sandboxed placeholder resolution).
 * When `source` is set, it is authoritative. When absent (pre-upgrade cached configs),
 * falls back to the legacy `dbId` heuristic for backward compatibility.
 */
export declare function isUserSourced(config: Pick<ParsedServerConfig, 'source' | 'dbId'>): boolean;
/**
 * Allowlist-based sanitization for API responses. Only explicitly listed fields are included;
 * new fields added to ParsedServerConfig are excluded by default until allowlisted here.
 *
 * URLs are returned as-is: DB-stored configs reject ${VAR} patterns at validation time
 * (MCPServerUserInputSchema), and YAML configs are admin-managed. Env variable resolution
 * is handled at the schema/input boundary, not the output boundary.
 */
export declare function redactServerSecrets(config: ParsedServerConfig): Partial<ParsedServerConfig>;
/** Applies allowlist-based sanitization to a map of server configs. */
export declare function redactAllServerSecrets(configs: Record<string, ParsedServerConfig>): Record<string, Partial<ParsedServerConfig>>;
/**
 * Normalizes a server name to match the pattern ^[a-zA-Z0-9_.-]+$
 * This is required for Azure OpenAI models with Tool Calling
 */
export declare function normalizeServerName(serverName: string): string;
/**
 * Builds the synthetic tool-call name used during MCP OAuth flows.
 * Format: `oauth<mcp_delimiter><normalizedServerName>`
 *
 * Guards against the caller passing a pre-wrapped name (one that already
 * starts with the oauth prefix in its original, un-normalized form) to
 * prevent double-wrapping.
 */
export declare function buildOAuthToolCallName(serverName: string): string;
/**
 * Sanitizes a URL by removing query parameters to prevent credential leakage in logs.
 * @param url - The URL to sanitize (string or URL object)
 * @returns The sanitized URL string without query parameters
 */
export declare function sanitizeUrlForLogging(url: string | URL): string;
/**
 * Escapes special regex characters in a string so they are treated literally.
 * @param str - The string to escape
 * @returns The escaped string safe for use in a regex pattern
 */
export declare function escapeRegex(str: string): string;
/**
 * Generates a URL-friendly server name from a title.
 * Converts to lowercase, replaces spaces with hyphens, removes special characters.
 * @param title - The display title to convert
 * @returns A slug suitable for use as serverName (e.g., "GitHub MCP Tool" → "github-mcp-tool")
 */
export declare function generateServerNameFromTitle(title: string): string;
//# sourceMappingURL=utils.d.ts.map