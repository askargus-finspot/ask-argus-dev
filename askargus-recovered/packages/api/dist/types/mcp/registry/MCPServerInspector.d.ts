import type { MCPConnection } from '~/mcp/connection';
import type * as t from '~/mcp/types';
/**
 * Inspects MCP servers to discover their metadata, capabilities, and tools.
 * Connects to servers and populates configuration with OAuth requirements,
 * server instructions, capabilities, and available tools.
 */
export declare class MCPServerInspector {
    private readonly serverName;
    private readonly config;
    private connection;
    private readonly useSSRFProtection;
    private readonly allowedDomains?;
    private constructor();
    /**
     * Inspects a server and returns an enriched configuration with metadata.
     * Detects OAuth requirements and fetches server capabilities.
     * @param serverName - The name of the server (used for tool function naming)
     * @param rawConfig - The raw server configuration
     * @param connection - The MCP connection
     * @param allowedDomains - Optional list of allowed domains for remote transports
     * @returns A fully processed and enriched configuration with server metadata
     */
    static inspect(serverName: string, rawConfig: t.MCPOptions, connection?: MCPConnection, allowedDomains?: string[] | null): Promise<t.ParsedServerConfig>;
    private inspectServer;
    private detectOAuth;
    private fetchServerInstructions;
    private fetchServerCapabilities;
    private fetchToolFunctions;
    /**
     * Converts server tools to AskArgus-compatible tool functions format.
     * @param serverName - The name of the server
     * @param connection - The MCP connection
     * @returns Tool functions formatted for AskArgus
     */
    static getToolFunctions(serverName: string, connection: MCPConnection): Promise<t.LCAvailableTools>;
}
//# sourceMappingURL=MCPServerInspector.d.ts.map