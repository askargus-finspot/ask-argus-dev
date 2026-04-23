/**
 * MCP-specific error classes
 */
export declare const MCPErrorCodes: {
    readonly DOMAIN_NOT_ALLOWED: "MCP_DOMAIN_NOT_ALLOWED";
    readonly INSPECTION_FAILED: "MCP_INSPECTION_FAILED";
};
export type MCPErrorCode = (typeof MCPErrorCodes)[keyof typeof MCPErrorCodes];
/**
 * Custom error for MCP domain restriction violations.
 * Thrown when a user attempts to connect to an MCP server whose domain is not in the allowlist.
 */
export declare class MCPDomainNotAllowedError extends Error {
    readonly code: "MCP_DOMAIN_NOT_ALLOWED";
    readonly statusCode = 403;
    readonly domain: string;
    constructor(domain: string);
}
/**
 * Custom error for MCP server inspection failures.
 * Thrown when attempting to connect/inspect an MCP server fails.
 */
export declare class MCPInspectionFailedError extends Error {
    readonly code: "MCP_INSPECTION_FAILED";
    readonly statusCode = 400;
    readonly serverName: string;
    constructor(serverName: string, cause?: Error);
}
/**
 * Type guard to check if an error is an MCPDomainNotAllowedError
 */
export declare function isMCPDomainNotAllowedError(error: unknown): error is MCPDomainNotAllowedError;
/**
 * Type guard to check if an error is an MCPInspectionFailedError
 */
export declare function isMCPInspectionFailedError(error: unknown): error is MCPInspectionFailedError;
//# sourceMappingURL=errors.d.ts.map