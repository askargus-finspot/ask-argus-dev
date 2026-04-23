/** Token count function that can be sync or async */
export type TokenCountFn = (text: string) => number | Promise<number>;
/**
 * Processes text content by counting tokens and truncating if it exceeds the specified limit.
 * Uses ratio-based estimation to minimize expensive tokenCountFn calls.
 *
 * @param text - The text content to process
 * @param tokenLimit - The maximum number of tokens allowed
 * @param tokenCountFn - Function to count tokens (can be sync or async)
 * @returns Promise resolving to object with processed text, token count, and truncation status
 *
 * @remarks
 * This function uses a ratio-based estimation algorithm instead of binary search.
 * Binary search would require O(log n) tokenCountFn calls (~17 for 100k chars),
 * while this approach typically requires only 2-3 calls for a 90%+ reduction in CPU usage.
 */
export declare function processTextWithTokenLimit({ text, tokenLimit, tokenCountFn, }: {
    text: string;
    tokenLimit: number;
    tokenCountFn: TokenCountFn;
}): Promise<{
    text: string;
    tokenCount: number;
    wasTruncated: boolean;
}>;
//# sourceMappingURL=text.d.ts.map