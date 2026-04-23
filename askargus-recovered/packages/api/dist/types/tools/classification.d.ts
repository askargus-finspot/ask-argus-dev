/**
 * @fileoverview Utility functions for building tool registries from agent tool_options.
 * Tool classification (deferred_tools, allowed_callers) is configured via the agent UI.
 *
 * @module packages/api/src/tools/classification
 */
import type { AgentToolOptions } from 'askargus-data-provider';
import type { LCToolRegistry, JsonSchemaType, AllowedCaller, GenericTool, LCTool } from '@askargus/agents';
export type { LCTool, LCToolRegistry, AllowedCaller, JsonSchemaType };
export interface ToolDefinition {
    name: string;
    description?: string;
    parameters?: JsonSchemaType;
    /** MCP server name extracted from tool name */
    serverName?: string;
}
/**
 * Extracts the MCP server name from a tool name.
 * Tool names follow the pattern: toolName_mcp_ServerName
 * @param toolName - The full tool name
 * @returns The server name or undefined if not an MCP tool
 */
export declare function getServerNameFromTool(toolName: string): string | undefined;
/**
 * Builds a tool registry from agent-level tool_options.
 *
 * @param tools - Array of tool definitions
 * @param agentToolOptions - Per-tool configuration from the agent
 * @returns Map of tool name to tool definition with classification
 */
export declare function buildToolRegistryFromAgentOptions(tools: ToolDefinition[], agentToolOptions: AgentToolOptions): LCToolRegistry;
interface MCPToolInstance {
    name: string;
    description?: string;
    mcp?: boolean;
    /** Original JSON schema attached at MCP tool creation time */
    mcpJsonSchema?: JsonSchemaType;
}
/**
 * Extracts MCP tool definition from a loaded tool instance.
 * MCP tools have the original JSON schema attached as `mcpJsonSchema` property.
 *
 * @param tool - The loaded tool instance
 * @returns Tool definition
 */
export declare function extractMCPToolDefinition(tool: MCPToolInstance): ToolDefinition;
/**
 * Checks if a tool is an MCP tool based on its properties.
 * @param tool - The tool to check (can be any object with potential mcp property)
 * @returns Whether the tool is an MCP tool
 */
export declare function isMCPTool(tool: unknown): tool is MCPToolInstance;
/**
 * Cleans up the temporary mcpJsonSchema property from MCP tools after registry is populated.
 * This property is only needed during registry building and can be safely removed afterward.
 *
 * @param tools - Array of tools to clean up
 */
export declare function cleanupMCPToolSchemas(tools: MCPToolInstance[]): void;
/** Parameters for building tool classification and creating PTC/tool search tools */
export interface BuildToolClassificationParams {
    /** All loaded tools (will be filtered for MCP tools) */
    loadedTools: GenericTool[];
    /** User ID for auth lookup */
    userId: string;
    /** Agent ID (used for logging and context) */
    agentId?: string;
    /** Per-tool configuration from the agent */
    agentToolOptions?: AgentToolOptions;
    /** Whether the deferred_tools capability is enabled (from agent config) */
    deferredToolsEnabled?: boolean;
    /** When true, skip creating tool instances (for event-driven mode) */
    definitionsOnly?: boolean;
    /** Function to load auth values (dependency injection) */
    loadAuthValues: (params: {
        userId: string;
        authFields: string[];
    }) => Promise<Record<string, string>>;
}
/** Result from building tool classification */
export interface BuildToolClassificationResult {
    /** Tool registry built from MCP tools (undefined if no MCP tools) */
    toolRegistry?: LCToolRegistry;
    /** Tool definitions array for event-driven execution (built simultaneously with registry) */
    toolDefinitions: LCTool[];
    /** Additional tools created (PTC and/or tool search) */
    additionalTools: GenericTool[];
    /** Whether any tools have defer_loading enabled (precomputed for efficiency) */
    hasDeferredTools: boolean;
}
/**
 * Checks if an agent's tools have any that match PTC patterns (programmatic only or dual context).
 * @param toolRegistry - The tool registry to check
 * @returns Whether any tools are configured for programmatic calling
 */
export declare function agentHasProgrammaticTools(toolRegistry: LCToolRegistry): boolean;
/**
 * Checks if an agent's tools have any that are deferred.
 * @param toolRegistry - The tool registry to check
 * @returns Whether any tools are configured as deferred
 */
export declare function agentHasDeferredTools(toolRegistry: LCToolRegistry): boolean;
/**
 * Builds the tool registry from MCP tools and conditionally creates PTC and tool search tools.
 *
 * This function:
 * 1. Filters loaded tools for MCP tools
 * 2. Extracts tool definitions and builds the registry from agent's tool_options
 * 3. Cleans up temporary mcpJsonSchema properties
 * 4. Creates PTC tool only if agent has tools configured for programmatic calling
 * 5. Creates tool search tool only if agent has deferred tools
 *
 * @param params - Parameters including loaded tools, userId, agentId, agentToolOptions, and dependencies
 * @returns Tool registry and any additional tools created
 */
export declare function buildToolClassification(params: BuildToolClassificationParams): Promise<BuildToolClassificationResult>;
//# sourceMappingURL=classification.d.ts.map