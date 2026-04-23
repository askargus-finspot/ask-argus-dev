/**
 * OpenAI-compatible event handlers for agent streaming.
 *
 * These handlers convert AskArgus's internal graph events into OpenAI-compatible
 * streaming format (SSE with chat.completion.chunk objects).
 */
import type { Response as ServerResponse } from 'express';
import type { ChatCompletionChunkChoice, OpenAIResponseContext, ChatCompletionChunk, CompletionUsage, ToolCall } from './types';
import type { ToolExecuteOptions } from '~/agents/handlers';
/**
 * Create a chat completion chunk in OpenAI format
 */
export declare function createChunk(context: OpenAIResponseContext, delta: ChatCompletionChunkChoice['delta'], finishReason?: ChatCompletionChunkChoice['finish_reason'], usage?: CompletionUsage): ChatCompletionChunk;
/**
 * Write an SSE event to the response
 */
export declare function writeSSE(res: ServerResponse, data: ChatCompletionChunk | string): void;
/**
 * Lightweight tracker for streaming responses.
 * Only tracks what's needed for finish_reason and usage - doesn't store content.
 */
export interface OpenAIStreamTracker {
    /** Whether any text content was emitted */
    hasText: boolean;
    /** Whether any reasoning content was emitted */
    hasReasoning: boolean;
    /** Accumulated tool calls by index */
    toolCalls: Map<number, ToolCall>;
    /** Accumulated usage metadata */
    usage: {
        promptTokens: number;
        completionTokens: number;
        reasoningTokens: number;
    };
    /** Mark that text was emitted */
    addText: () => void;
    /** Mark that reasoning was emitted */
    addReasoning: () => void;
}
/**
 * Create a lightweight stream tracker (doesn't store content)
 */
export declare function createOpenAIStreamTracker(): OpenAIStreamTracker;
/**
 * Content aggregator for non-streaming responses.
 * Accumulates full text content, reasoning, and tool calls.
 * Uses arrays for O(n) text accumulation instead of O(n²) string concatenation.
 */
export interface OpenAIContentAggregator {
    /** Accumulated text chunks */
    textChunks: string[];
    /** Accumulated reasoning/thinking chunks */
    reasoningChunks: string[];
    /** Accumulated tool calls by index */
    toolCalls: Map<number, ToolCall>;
    /** Accumulated usage metadata */
    usage: {
        promptTokens: number;
        completionTokens: number;
        reasoningTokens: number;
    };
    /** Get accumulated text (joins chunks) */
    getText: () => string;
    /** Get accumulated reasoning (joins chunks) */
    getReasoning: () => string;
    /** Add text chunk */
    addText: (text: string) => void;
    /** Add reasoning chunk */
    addReasoning: (text: string) => void;
}
/**
 * Create a content aggregator for non-streaming responses
 */
export declare function createOpenAIContentAggregator(): OpenAIContentAggregator;
/**
 * Handler configuration for OpenAI streaming
 */
export interface OpenAIStreamHandlerConfig {
    res: ServerResponse;
    context: OpenAIResponseContext;
    tracker: OpenAIStreamTracker;
}
/**
 * Graph event types from @askargus/agents
 */
export declare const GraphEvents: {
    readonly CHAT_MODEL_END: "on_chat_model_end";
    readonly TOOL_END: "on_tool_end";
    readonly CHAT_MODEL_STREAM: "on_chat_model_stream";
    readonly ON_RUN_STEP: "on_run_step";
    readonly ON_RUN_STEP_DELTA: "on_run_step_delta";
    readonly ON_RUN_STEP_COMPLETED: "on_run_step_completed";
    readonly ON_MESSAGE_DELTA: "on_message_delta";
    readonly ON_REASONING_DELTA: "on_reasoning_delta";
    readonly ON_TOOL_EXECUTE: "on_tool_execute";
};
/**
 * Step types from askargus-data-provider
 */
export declare const StepTypes: {
    readonly MESSAGE_CREATION: "message_creation";
    readonly TOOL_CALLS: "tool_calls";
};
/**
 * Event data interfaces
 */
export interface MessageDeltaData {
    id?: string;
    content?: Array<{
        type: string;
        text?: string;
    }>;
}
export interface RunStepDeltaData {
    id?: string;
    delta?: {
        type?: string;
        tool_calls?: Array<{
            index?: number;
            id?: string;
            type?: string;
            function?: {
                name?: string;
                arguments?: string;
            };
        }>;
    };
}
export interface ToolEndData {
    output?: {
        name?: string;
        tool_call_id?: string;
        content?: string;
    };
}
export interface ModelEndData {
    output?: {
        usage_metadata?: {
            input_tokens?: number;
            output_tokens?: number;
            model?: string;
        };
    };
}
/**
 * Event handler interface
 */
export interface EventHandler {
    handle(event: string, data: unknown, metadata?: Record<string, unknown>, graph?: unknown): void | Promise<void>;
}
/**
 * Handler for message delta events - streams text content
 */
export declare class OpenAIMessageDeltaHandler implements EventHandler {
    private config;
    constructor(config: OpenAIStreamHandlerConfig);
    handle(_event: string, data: MessageDeltaData): void;
}
/**
 * Handler for run step delta events - streams tool calls
 */
export declare class OpenAIRunStepDeltaHandler implements EventHandler {
    private config;
    constructor(config: OpenAIStreamHandlerConfig);
    handle(_event: string, data: RunStepDeltaData): void;
}
/**
 * Handler for run step events - sends initial tool call info
 */
export declare class OpenAIRunStepHandler implements EventHandler {
    private config;
    constructor(config: OpenAIStreamHandlerConfig);
    handle(_event: string, data: {
        stepDetails?: {
            type?: string;
        };
    }): void;
}
/**
 * Handler for model end events - captures usage
 */
export declare class OpenAIModelEndHandler implements EventHandler {
    private config;
    constructor(config: OpenAIStreamHandlerConfig);
    handle(_event: string, data: ModelEndData): void;
}
/**
 * Handler for chat model stream events
 */
export declare class OpenAIChatModelStreamHandler implements EventHandler {
    handle(): void;
}
/**
 * Handler for tool end events
 */
export declare class OpenAIToolEndHandler implements EventHandler {
    handle(): void;
}
/**
 * Handler for reasoning delta events.
 * Streams reasoning/thinking content using the `delta.reasoning` field (OpenRouter convention).
 */
export declare class OpenAIReasoningDeltaHandler implements EventHandler {
    private config;
    constructor(config: OpenAIStreamHandlerConfig);
    handle(_event: string, data: MessageDeltaData): void;
}
/**
 * Create all handlers for OpenAI streaming format
 */
export declare function createOpenAIHandlers(config: OpenAIStreamHandlerConfig, toolExecuteOptions?: ToolExecuteOptions): Record<string, EventHandler>;
/**
 * Send the final chunk with finish_reason and optional usage
 */
export declare function sendFinalChunk(config: OpenAIStreamHandlerConfig, finishReason?: ChatCompletionChunkChoice['finish_reason']): void;
//# sourceMappingURL=handlers.d.ts.map