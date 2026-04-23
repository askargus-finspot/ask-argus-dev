/**
 * Open Responses API Handlers
 *
 * Semantic event emitters and response tracking for the Open Responses API.
 * Events follow the Open Responses spec with proper lifecycle management.
 */
import type { Response as ServerResponse } from 'express';
import type { Response, ResponseContext, ResponseEvent, OutputItem, MessageItem, FunctionCallItem, FunctionCallOutputItem, ReasoningItem, OutputTextContent, ReasoningTextContent, ItemStatus, ResponseStatus } from './types';
/**
 * Tracks the state of a response during streaming.
 * Manages items, sequence numbers, and accumulated content.
 */
export interface ResponseTracker {
    /** Current sequence number (monotonically increasing) */
    sequenceNumber: number;
    /** Output items being built */
    items: OutputItem[];
    /** Current message item (if any) */
    currentMessage: MessageItem | null;
    /** Current message content index */
    currentContentIndex: number;
    /** Current reasoning item (if any) */
    currentReasoning: ReasoningItem | null;
    /** Current reasoning content index */
    currentReasoningContentIndex: number;
    /** Map of function call items by call_id */
    functionCalls: Map<string, FunctionCallItem>;
    /** Map of function call outputs by call_id */
    functionCallOutputs: Map<string, FunctionCallOutputItem>;
    /** Accumulated text for current message */
    accumulatedText: string;
    /** Accumulated reasoning text */
    accumulatedReasoningText: string;
    /** Accumulated function call arguments by call_id */
    accumulatedArguments: Map<string, string>;
    /** Token usage */
    usage: {
        inputTokens: number;
        outputTokens: number;
        reasoningTokens: number;
        cachedTokens: number;
    };
    /** Response status */
    status: ResponseStatus;
    /** Get next sequence number */
    nextSequence: () => number;
}
/**
 * Create a new response tracker
 */
export declare function createResponseTracker(): ResponseTracker;
/**
 * Write a semantic SSE event to the response.
 * The `event:` field matches the `type` in the data payload.
 */
export declare function writeEvent(res: ServerResponse, event: ResponseEvent): void;
/**
 * Write the terminal [DONE] event
 */
export declare function writeDone(res: ServerResponse): void;
/**
 * Build a Response object from context and tracker
 * Includes all required fields per Open Responses spec
 */
export declare function buildResponse(context: ResponseContext, tracker: ResponseTracker, status?: ResponseStatus): Response;
/**
 * Generate a unique item ID
 */
export declare function generateItemId(prefix: string): string;
/**
 * Create a new message item
 */
export declare function createMessageItem(status?: ItemStatus): MessageItem;
/**
 * Create a new function call item
 */
export declare function createFunctionCallItem(callId: string, name: string, status?: ItemStatus): FunctionCallItem;
/**
 * Create a new function call output item
 */
export declare function createFunctionCallOutputItem(callId: string, output: string, status?: ItemStatus): FunctionCallOutputItem;
/**
 * Create a new reasoning item
 */
export declare function createReasoningItem(status?: ItemStatus): ReasoningItem;
/**
 * Create output text content
 */
export declare function createOutputTextContent(text?: string): OutputTextContent;
/**
 * Create reasoning text content
 */
export declare function createReasoningTextContent(text?: string): ReasoningTextContent;
export interface StreamHandlerConfig {
    res: ServerResponse;
    context: ResponseContext;
    tracker: ResponseTracker;
}
/**
 * Emit response.created event
 * This is the first event emitted per the Open Responses spec
 */
export declare function emitResponseCreated(config: StreamHandlerConfig): void;
/**
 * Emit response.in_progress event
 */
export declare function emitResponseInProgress(config: StreamHandlerConfig): void;
/**
 * Emit response.completed event
 */
export declare function emitResponseCompleted(config: StreamHandlerConfig): void;
/**
 * Emit response.failed event
 */
export declare function emitResponseFailed(config: StreamHandlerConfig, error: {
    type: string;
    message: string;
    code?: string;
}): void;
/**
 * Emit response.output_item.added event for a message
 */
export declare function emitMessageItemAdded(config: StreamHandlerConfig): MessageItem;
/**
 * Emit response.output_item.done event for a message
 */
export declare function emitMessageItemDone(config: StreamHandlerConfig): void;
/**
 * Emit response.content_part.added for text content
 */
export declare function emitTextContentPartAdded(config: StreamHandlerConfig): void;
/**
 * Emit response.output_text.delta event
 */
export declare function emitOutputTextDelta(config: StreamHandlerConfig, delta: string): void;
/**
 * Emit response.output_text.done event
 */
export declare function emitOutputTextDone(config: StreamHandlerConfig): void;
/**
 * Emit response.content_part.done for text content
 */
export declare function emitTextContentPartDone(config: StreamHandlerConfig): void;
/**
 * Emit response.output_item.added for a function call
 */
export declare function emitFunctionCallItemAdded(config: StreamHandlerConfig, callId: string, name: string): FunctionCallItem;
/**
 * Emit response.function_call_arguments.delta event
 */
export declare function emitFunctionCallArgumentsDelta(config: StreamHandlerConfig, callId: string, delta: string): void;
/**
 * Emit response.function_call_arguments.done event
 */
export declare function emitFunctionCallArgumentsDone(config: StreamHandlerConfig, callId: string): void;
/**
 * Emit response.output_item.done for a function call
 */
export declare function emitFunctionCallItemDone(config: StreamHandlerConfig, callId: string): void;
/**
 * Emit function call output item (internal tool result)
 */
export declare function emitFunctionCallOutputItem(config: StreamHandlerConfig, callId: string, output: string): void;
/**
 * Emit response.output_item.added for reasoning
 */
export declare function emitReasoningItemAdded(config: StreamHandlerConfig): ReasoningItem;
/**
 * Emit response.content_part.added for reasoning
 */
export declare function emitReasoningContentPartAdded(config: StreamHandlerConfig): void;
/**
 * Emit response.reasoning.delta event
 */
export declare function emitReasoningDelta(config: StreamHandlerConfig, delta: string): void;
/**
 * Emit response.reasoning.done event
 */
export declare function emitReasoningDone(config: StreamHandlerConfig): void;
/**
 * Emit response.content_part.done for reasoning
 */
export declare function emitReasoningContentPartDone(config: StreamHandlerConfig): void;
/**
 * Emit response.output_item.done for reasoning
 */
export declare function emitReasoningItemDone(config: StreamHandlerConfig): void;
/**
 * Emit error event
 */
export declare function emitError(config: StreamHandlerConfig, error: {
    type: string;
    message: string;
    code?: string;
}): void;
/**
 * Attachment data for askargus:attachment events
 */
export interface AttachmentData {
    /** File ID in AskArgus storage */
    file_id?: string;
    /** Original filename */
    filename?: string;
    /** MIME type */
    type?: string;
    /** URL to access the file */
    url?: string;
    /** Base64-encoded image data (for inline images) */
    image_url?: string;
    /** Width for images */
    width?: number;
    /** Height for images */
    height?: number;
    /** Associated tool call ID */
    tool_call_id?: string;
    /** Additional metadata */
    [key: string]: unknown;
}
/**
 * Emit askargus:attachment event for file/image attachments
 * This is a AskArgus extension to the Open Responses streaming protocol.
 * External clients can safely ignore these events.
 */
export declare function emitAttachment(config: StreamHandlerConfig, attachment: AttachmentData, options?: {
    messageId?: string;
    conversationId?: string;
}): void;
/**
 * Write attachment event directly to response (for use outside streaming context)
 * Useful when attachment processing happens asynchronously
 */
export declare function writeAttachmentEvent(res: ServerResponse, sequenceNumber: number, attachment: AttachmentData, options?: {
    messageId?: string;
    conversationId?: string;
}): void;
/**
 * Build a complete non-streaming response
 */
export declare function buildResponsesNonStreamingResponse(context: ResponseContext, tracker: ResponseTracker): Response;
/**
 * Update tracker usage from collected data
 */
export declare function updateTrackerUsage(tracker: ResponseTracker, usage: {
    promptTokens?: number;
    completionTokens?: number;
    reasoningTokens?: number;
    cachedTokens?: number;
}): void;
//# sourceMappingURL=handlers.d.ts.map