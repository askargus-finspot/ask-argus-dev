import type { TMessageContentParts } from 'askargus-data-provider';
/**
 * Filters out malformed tool call content parts that don't have the required tool_call property.
 * This handles edge cases where tool_call content parts may be created with only a type property
 * but missing the actual tool_call data.
 *
 * @param contentParts - Array of content parts to filter
 * @returns Filtered array with malformed tool calls removed
 *
 * @example
 * // Removes malformed tool_call without the tool_call property
 * const parts = [
 *   { type: 'tool_call', tool_call: { id: '123', name: 'test' } }, // valid - kept
 *   { type: 'tool_call' }, // invalid - filtered out
 *   { type: 'text', text: 'Hello' }, // valid - kept (other types pass through)
 * ];
 * const filtered = filterMalformedContentParts(parts);
 * // Returns all parts except the malformed tool_call
 */
export declare function filterMalformedContentParts(contentParts: TMessageContentParts[]): TMessageContentParts[];
export declare function filterMalformedContentParts<T>(contentParts: T): T;
//# sourceMappingURL=content.d.ts.map