import { DynamicStructuredTool } from '@langchain/core/tools';
import type { Agent, TEphemeralAgent } from 'askargus-data-provider';
import type { LCTool } from '@askargus/agents';
import type { Logger } from 'winston';
import type { ParsedServerConfig } from '~/mcp/types';
import type { MCPManager } from '~/mcp/MCPManager';
/**
 * Agent type with optional tools array that can contain DynamicStructuredTool or string.
 * For context operations, we only require id and instructions, other Agent fields are optional.
 */
export type AgentWithTools = Pick<Agent, 'id'> & Partial<Omit<Agent, 'id' | 'tools'>> & {
    tools?: Array<DynamicStructuredTool | string>;
    /** Serializable tool definitions for event-driven mode */
    toolDefinitions?: LCTool[];
};
/**
 * Extracts unique MCP server names from an agent's tools or tool definitions.
 * Supports both full tool instances (tools) and serializable definitions (toolDefinitions).
 * @param agent - The agent with tools and/or tool definitions
 * @returns Array of unique MCP server names
 */
export declare function extractMCPServers(agent: AgentWithTools): string[];
/**
 * Fetches MCP instructions for the given server names.
 * @param {string[]} mcpServers - Array of MCP server names
 * @param {MCPManager} mcpManager - MCP manager instance
 * @param {Logger} [logger] - Optional logger instance
 * @returns {Promise<string>} MCP instructions string, empty if none
 */
export declare function getMCPInstructionsForServers(mcpServers: string[], mcpManager: MCPManager, logger?: Logger, configServers?: Record<string, ParsedServerConfig>): Promise<string>;
/**
 * Builds final instructions for an agent by combining shared run context and agent-specific context.
 * Order: sharedRunContext -> baseInstructions -> mcpInstructions
 *
 * @param {Object} params
 * @param {string} [params.sharedRunContext] - Run-level context shared by all agents (file context, RAG, memory)
 * @param {string} [params.baseInstructions] - Agent's base instructions
 * @param {string} [params.mcpInstructions] - Agent's MCP server instructions
 * @returns {string | undefined} Combined instructions, or undefined if empty
 */
export declare function buildAgentInstructions({ sharedRunContext, baseInstructions, mcpInstructions, }: {
    sharedRunContext?: string;
    baseInstructions?: string;
    mcpInstructions?: string;
}): string | undefined;
/**
 * Applies run context and MCP instructions to an agent's configuration.
 * Mutates the agent object in place.
 *
 * @param {Object} params
 * @param {Agent} params.agent - The agent to update
 * @param {string} params.sharedRunContext - Run-level shared context
 * @param {MCPManager} params.mcpManager - MCP manager instance
 * @param {Object} [params.ephemeralAgent] - Ephemeral agent config (for MCP override)
 * @param {string} [params.agentId] - Agent ID for logging
 * @param {Logger} [params.logger] - Optional logger instance
 * @returns {Promise<void>}
 */
export declare function applyContextToAgent({ agent, sharedRunContext, mcpManager, ephemeralAgent, agentId, logger, configServers, }: {
    agent: AgentWithTools;
    sharedRunContext: string;
    mcpManager: MCPManager;
    ephemeralAgent?: TEphemeralAgent;
    agentId?: string;
    logger?: Logger;
    configServers?: Record<string, ParsedServerConfig>;
}): Promise<void>;
//# sourceMappingURL=context.d.ts.map