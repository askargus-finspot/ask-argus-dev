/**
 * Inlined utility functions previously imported from @askargus/api.
 * These are used only by test files in data-schemas.
 */
/**
 * Finds the first matching pattern in a tokens/values map by reverse-iterating
 * and checking if the model name (lowercased) includes the key.
 *
 * Inlined from @askargus/api findMatchingPattern
 */
export declare function findMatchingPattern(modelName: string, tokensMap: Record<string, number | Record<string, number>>): string | undefined;
/**
 * Matches a model name to a canonical key. When no maxTokensMap is available
 * (as in data-schemas tests), returns the model name as-is.
 *
 * Inlined from @askargus/api matchModelName (simplified for test use)
 */
export declare function matchModelName(modelName: string, _endpoint?: string): string | undefined;
