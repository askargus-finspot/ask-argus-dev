import type { Response as ServerResponse, Request } from 'express';
import type { ChatCompletionResponse, OpenAIResponseContext, ChatCompletionRequest, OpenAIErrorResponse, CompletionUsage, ChatMessage, ToolCall } from './types';
import type { EventHandler } from './handlers';
import type { ToolExecuteOptions } from '../handlers';
/**
 * Dependencies for the chat completion service
 */
export interface ChatCompletionDependencies {
    /** Get agent by ID */
    getAgent: (params: {
        id: string;
    }) => Promise<Agent | null>;
    /** Initialize agent for use */
    initializeAgent: (params: InitializeAgentParams) => Promise<InitializedAgent>;
    /** Load agent tools */
    loadAgentTools?: LoadToolsFn;
    /** Get models config */
    getModelsConfig?: (req: Request) => Promise<unknown>;
    /** Validate agent model */
    validateAgentModel?: (params: unknown) => Promise<{
        isValid: boolean;
        error?: {
            message: string;
        };
    }>;
    /** Log violation */
    logViolation?: (req: Request, res: ServerResponse, type: string, info: unknown, score: number) => Promise<void>;
    /** Create agent run */
    createRun?: CreateRunFn;
    /** App config */
    appConfig?: AppConfig;
    /** Tool execute options for event-driven tool execution */
    toolExecuteOptions?: ToolExecuteOptions;
}
/**
 * Agent type from askargus-data-provider
 */
interface Agent {
    id: string;
    name?: string;
    model?: string;
    provider: string;
    tools?: string[];
    instructions?: string;
    model_parameters?: Record<string, unknown>;
    tool_resources?: Record<string, unknown>;
    tool_options?: Record<string, unknown>;
    [key: string]: unknown;
}
/**
 * Initialized agent type - note: after initialization, tools become structured tool objects
 */
interface InitializedAgent {
    id: string;
    name?: string;
    model?: string;
    provider: string;
    /** After initialization, tools are structured tool objects, not strings */
    tools: unknown[];
    instructions?: string;
    model_parameters?: Record<string, unknown>;
    tool_resources?: Record<string, unknown>;
    tool_options?: Record<string, unknown>;
    attachments: unknown[];
    toolContextMap: Record<string, unknown>;
    maxContextTokens: number;
    userMCPAuthMap?: Record<string, Record<string, string>>;
    [key: string]: unknown;
}
/**
 * Initialize agent params
 */
interface InitializeAgentParams {
    req: Request;
    res: ServerResponse;
    agent: Agent;
    conversationId?: string | null;
    parentMessageId?: string | null;
    requestFiles?: unknown[];
    loadTools?: LoadToolsFn;
    endpointOption?: Record<string, unknown>;
    allowedProviders: Set<string>;
    isInitialAgent?: boolean;
}
/**
 * Tool loading function type
 */
type LoadToolsFn = (params: {
    req: Request;
    res: ServerResponse;
    provider: string;
    agentId: string;
    tools: string[];
    model: string | null;
    tool_options: unknown;
    tool_resources: unknown;
}) => Promise<{
    tools: unknown[];
    toolContextMap: Record<string, unknown>;
    userMCPAuthMap?: Record<string, Record<string, string>>;
} | null>;
/**
 * Create run function type
 */
type CreateRunFn = (params: {
    agents: unknown[];
    messages: unknown[];
    runId: string;
    signal: AbortSignal;
    customHandlers: Record<string, EventHandler>;
    requestBody: Record<string, unknown>;
    user: Record<string, unknown>;
    tokenCounter?: (message: unknown) => number;
}) => Promise<{
    Graph?: unknown;
    processStream: (input: {
        messages: unknown[];
    }, config: Record<string, unknown>, options: Record<string, unknown>) => Promise<void>;
} | null>;
/**
 * App config type
 */
interface AppConfig {
    endpoints?: Record<string, unknown>;
    [key: string]: unknown;
}
/**
 * Convert OpenAI messages to AskArgus format
 */
export declare function convertMessages(messages: ChatMessage[]): unknown[];
/**
 * Create an error response in OpenAI format
 */
export declare function createErrorResponse(message: string, type?: string, code?: string | null): OpenAIErrorResponse;
/**
 * Send an error response
 */
export declare function sendErrorResponse(res: ServerResponse, statusCode: number, message: string, type?: string, code?: string | null): void;
/**
 * Validation result types for chat completion requests
 */
export type ChatCompletionValidationSuccess = {
    valid: true;
    request: ChatCompletionRequest;
};
export type ChatCompletionValidationFailure = {
    valid: false;
    error: string;
};
export type ChatCompletionValidationResult = ChatCompletionValidationSuccess | ChatCompletionValidationFailure;
/**
 * Type guard for validation failure
 */
export declare function isChatCompletionValidationFailure(result: ChatCompletionValidationResult): result is ChatCompletionValidationFailure;
/**
 * Validate the chat completion request
 */
export declare function validateRequest(body: unknown): ChatCompletionValidationResult;
/**
 * Build a non-streaming response from aggregated content
 */
export declare function buildNonStreamingResponse(context: OpenAIResponseContext, text: string, reasoning: string, toolCalls: Map<number, ToolCall>, usage: CompletionUsage): ChatCompletionResponse;
/**
 * Main handler for OpenAI-compatible chat completions with agents.
 *
 * This function:
 * 1. Validates the request
 * 2. Looks up the agent by ID (model parameter)
 * 3. Initializes the agent with tools
 * 4. Runs the agent and streams/returns the response
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param deps - Dependencies for the service
 */
export declare function createAgentChatCompletion(req: Request, res: ServerResponse, deps: ChatCompletionDependencies): Promise<void>;
/**
 * List available agents/models
 *
 * This provides a /v1/models compatible endpoint that lists available agents.
 */
export declare function listAgentModels(_req: Request, res: ServerResponse, deps: {
    getAgents: (params: Record<string, unknown>) => Promise<Agent[]>;
}): Promise<void>;
export {};
//# sourceMappingURL=service.d.ts.map