/**
 * Open Responses API Service
 *
 * Core service for processing Open Responses API requests.
 * Handles input conversion, message formatting, and request validation.
 */
import type { Response as ServerResponse } from 'express';
import type { RequestValidationResult, ResponseRequest, ResponseContext, InputItem, Response } from './types';
import { type StreamHandlerConfig } from './handlers';
/**
 * Validate a request body
 */
export declare function validateResponseRequest(body: unknown): RequestValidationResult;
/**
 * Check if validation failed
 */
export declare function isValidationFailure(result: RequestValidationResult): result is {
    valid: false;
    error: string;
};
/** Internal message format (AskArgus-compatible) */
export interface InternalMessage {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string | Array<{
        type: string;
        text?: string;
        image_url?: unknown;
    }>;
    name?: string;
    tool_call_id?: string;
    tool_calls?: Array<{
        id: string;
        type: 'function';
        function: {
            name: string;
            arguments: string;
        };
    }>;
}
/**
 * Convert Open Responses input to internal message format.
 * Handles both string input and array of items.
 */
export declare function convertInputToMessages(input: string | InputItem[]): InternalMessage[];
/**
 * Merge previous conversation messages with new input
 */
export declare function mergeMessagesWithInput(previousMessages: InternalMessage[], newInput: InternalMessage[]): InternalMessage[];
/**
 * Send an error response in Open Responses format
 */
export declare function sendResponsesErrorResponse(res: ServerResponse, statusCode: number, message: string, type?: string, code?: string): void;
/**
 * Generate a unique response ID
 */
export declare function generateResponseId(): string;
/**
 * Create a response context from request
 */
export declare function createResponseContext(request: ResponseRequest, responseId?: string): ResponseContext;
/**
 * Set up streaming response headers
 */
export declare function setupStreamingResponse(res: ServerResponse): void;
/**
 * State for tracking streaming progress
 */
interface StreamState {
    messageStarted: boolean;
    messageContentStarted: boolean;
    reasoningStarted: boolean;
    reasoningContentStarted: boolean;
    activeToolCalls: Set<string>;
    completedToolCalls: Set<string>;
}
/**
 * Create AskArgus event handlers that emit Open Responses events
 */
export declare function createResponsesEventHandlers(config: StreamHandlerConfig): {
    handlers: Record<string, {
        handle: (event: string, data: unknown) => void;
    }>;
    state: StreamState;
    finalizeStream: () => void;
};
/**
 * Aggregator for non-streaming responses
 */
export interface ResponseAggregator {
    textChunks: string[];
    reasoningChunks: string[];
    toolCalls: Map<string, {
        id: string;
        name: string;
        arguments: string;
    }>;
    toolOutputs: Map<string, string>;
    usage: {
        inputTokens: number;
        outputTokens: number;
        reasoningTokens: number;
        cachedTokens: number;
    };
    addText: (text: string) => void;
    addReasoning: (text: string) => void;
    getText: () => string;
    getReasoning: () => string;
}
/**
 * Create an aggregator for non-streaming responses
 */
export declare function createResponseAggregator(): ResponseAggregator;
/**
 * Build a non-streaming response from aggregator
 * Includes all required fields per Open Responses spec
 */
export declare function buildAggregatedResponse(context: ResponseContext, aggregator: ResponseAggregator): Response;
/**
 * Create event handlers for non-streaming aggregation
 */
export declare function createAggregatorEventHandlers(aggregator: ResponseAggregator): Record<string, {
    handle: (event: string, data: unknown) => void;
}>;
export {};
//# sourceMappingURL=service.d.ts.map