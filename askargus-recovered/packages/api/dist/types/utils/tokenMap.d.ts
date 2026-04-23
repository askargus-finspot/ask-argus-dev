import type { BaseMessage } from '@langchain/core/messages';
/** Signature for a function that counts tokens in a LangChain message. */
export type TokenCounter = (message: BaseMessage) => number;
/**
 * Lazily fills missing token counts for formatted LangChain messages.
 * Preserves precomputed counts and only computes undefined indices.
 *
 * This is used after `formatAgentMessages` to ensure every message index
 * has a token count before passing `indexTokenCountMap` to the agent run.
 */
export declare function hydrateMissingIndexTokenCounts({ messages, indexTokenCountMap, tokenCounter, }: {
    messages: BaseMessage[];
    indexTokenCountMap: Record<number, number | undefined> | undefined;
    tokenCounter: TokenCounter;
}): Record<number, number>;
//# sourceMappingURL=tokenMap.d.ts.map