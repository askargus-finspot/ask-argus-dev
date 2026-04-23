import type { Agent, TMessage } from 'askargus-data-provider';
import type { BaseMessage } from '@langchain/core/messages';
import type { ServerRequest } from '~/types';
import Tokenizer from '~/utils/tokenizer';
export declare const omitTitleOptions: Set<string>;
export declare function payloadParser({ req, endpoint }: {
    req: ServerRequest;
    endpoint: string;
}): Record<string, unknown> | undefined;
/**
 * Anthropic's API consistently reports ~10% more tokens than the local
 * claude tokenizer due to internal message framing and content encoding.
 * Verified empirically across content types via the count_tokens endpoint.
 */
export declare const CLAUDE_TOKEN_CORRECTION = 1.1;
/**
 * Estimates token cost for image and document blocks in a message's
 * content array. Covers: image_url, image, image_file, document, file.
 */
export declare function estimateMediaTokensForMessage(content: unknown, isClaude: boolean, getTokenCount?: (text: string) => number): number;
/**
 * Single-pass token counter for formatted messages (plain objects with role/content/name).
 * Handles text, tool_call, image, and document content types in one iteration,
 * then applies Claude correction when applicable.
 */
export declare function countFormattedMessageTokens(message: Partial<Record<string, unknown>>, encoding: Parameters<typeof Tokenizer.getTokenCount>[1]): number;
export declare function createTokenCounter(encoding: Parameters<typeof Tokenizer.getTokenCount>[1]): (message: BaseMessage) => number;
export declare function logToolError(_graph: unknown, error: unknown, toolId: string): void;
/** Finds the primary agent ID within a set of agent IDs (no suffix or lowest suffix number) */
export declare function findPrimaryAgentId(agentIds: Set<string>): string | null;
/**
 * Creates a mapMethod for getMessagesForConversation that processes agent content.
 * - Strips agentId/groupId metadata from all content
 * - For parallel agents (addedConvo with groupId): filters each group to its primary agent
 * - For handoffs (agentId without groupId): keeps all content from all agents
 * - For multi-agent: applies agent labels to content
 *
 * The key distinction:
 * - Parallel execution (addedConvo): Parts have both agentId AND groupId
 * - Handoffs: Parts only have agentId, no groupId
 */
export declare function createMultiAgentMapper(primaryAgent: Agent, agentConfigs?: Map<string, Agent>): (message: TMessage) => TMessage;
//# sourceMappingURL=client.d.ts.map