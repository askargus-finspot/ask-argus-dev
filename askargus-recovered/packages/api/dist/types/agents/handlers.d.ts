import type { EventHandler } from '@askargus/agents';
import type { StructuredToolInterface } from '@langchain/core/tools';
export interface ToolEndCallbackData {
    output: {
        name: string;
        tool_call_id: string;
        content: string | unknown;
        artifact?: unknown;
    };
}
export interface ToolEndCallbackMetadata {
    run_id?: string;
    thread_id?: string;
    [key: string]: unknown;
}
export type ToolEndCallback = (data: ToolEndCallbackData, metadata: ToolEndCallbackMetadata) => Promise<void>;
export interface ToolExecuteOptions {
    /** Loads tools by name, using agentId to look up agent-specific context */
    loadTools: (toolNames: string[], agentId?: string) => Promise<{
        loadedTools: StructuredToolInterface[];
        /** Additional configurable properties to merge (e.g., userMCPAuthMap) */
        configurable?: Record<string, unknown>;
    }>;
    /** Callback to process tool artifacts (code output files, file citations, etc.) */
    toolEndCallback?: ToolEndCallback;
}
/**
 * Creates the ON_TOOL_EXECUTE handler for event-driven tool execution.
 * This handler receives batched tool calls, loads the required tools,
 * executes them in parallel, and resolves with the results.
 */
export declare function createToolExecuteHandler(options: ToolExecuteOptions): EventHandler;
/**
 * Creates a handlers object that includes ON_TOOL_EXECUTE.
 * Can be merged with other handler objects.
 */
export declare function createToolExecuteHandlers(options: ToolExecuteOptions): Record<string, EventHandler>;
//# sourceMappingURL=handlers.d.ts.map