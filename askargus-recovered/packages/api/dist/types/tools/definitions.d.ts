/**
 * @fileoverview Tool definitions loader for event-driven mode.
 * Loads tool definitions without creating tool instances for efficient initialization.
 *
 * @module packages/api/src/tools/definitions
 */
import type { AgentToolOptions } from 'askargus-data-provider';
import type { LCToolRegistry, JsonSchemaType, LCTool } from '@askargus/agents';
import type { ToolDefinition } from './classification';
export interface MCPServerTool {
    function?: {
        name?: string;
        description?: string;
        parameters?: JsonSchemaType;
    };
}
export type MCPServerTools = Record<string, MCPServerTool>;
export interface LoadToolDefinitionsParams {
    /** User ID for MCP server tool lookup */
    userId: string;
    /** Agent ID for tool classification */
    agentId: string;
    /** Agent's tool list (tool names/identifiers) */
    tools: string[];
    /** Agent-specific tool options */
    toolOptions?: AgentToolOptions;
    /** Whether deferred tools feature is enabled */
    deferredToolsEnabled?: boolean;
}
export interface ActionToolDefinition {
    name: string;
    description?: string;
    parameters?: JsonSchemaType;
}
export interface LoadToolDefinitionsDeps {
    /** Gets MCP server tools - first checks cache, then initializes server if needed */
    getOrFetchMCPServerTools: (userId: string, serverName: string) => Promise<MCPServerTools | null>;
    /** Checks if a tool name is a known built-in tool */
    isBuiltInTool: (toolName: string) => boolean;
    /** Loads auth values for tool search (passed to buildToolClassification) */
    loadAuthValues: (params: {
        userId: string;
        authFields: string[];
    }) => Promise<Record<string, string>>;
    /** Loads action tool definitions (schemas) from OpenAPI specs */
    getActionToolDefinitions?: (agentId: string, actionToolNames: string[]) => Promise<ActionToolDefinition[]>;
}
export interface LoadToolDefinitionsResult {
    toolDefinitions: (ToolDefinition | LCTool)[];
    toolRegistry: LCToolRegistry;
    hasDeferredTools: boolean;
}
/**
 * Loads tool definitions without creating tool instances.
 * This is the efficient path for event-driven mode where tools are loaded on-demand.
 */
export declare function loadToolDefinitions(params: LoadToolDefinitionsParams, deps: LoadToolDefinitionsDeps): Promise<LoadToolDefinitionsResult>;
//# sourceMappingURL=definitions.d.ts.map