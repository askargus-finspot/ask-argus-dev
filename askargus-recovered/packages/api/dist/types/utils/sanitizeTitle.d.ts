/** Max character length for sanitized titles (the output will never exceed this). */
export declare const MAX_TITLE_LENGTH = 200;
export declare const DEFAULT_TITLE_FALLBACK = "Untitled Conversation";
/**
 * Sanitizes LLM-generated chat titles by removing {@link https://en.wikipedia.org/wiki/Chain-of-thought_prompting <think>}
 * reasoning blocks, normalizing whitespace, and truncating to {@link MAX_TITLE_LENGTH} characters.
 *
 * Titles exceeding the limit are truncated at a code-point-safe boundary and suffixed with `...`.
 *
 * @param rawTitle - The raw LLM-generated title string, potentially containing <think> blocks.
 * @returns A sanitized, potentially truncated title string, never empty (fallback used if needed).
 */
export declare function sanitizeTitle(rawTitle: string): string;
//# sourceMappingURL=sanitizeTitle.d.ts.map