/**
 * Token Pricing Configuration
 *
 * Pattern Matching
 * ================
 * `findMatchingPattern` uses `modelName.includes(key)` and selects the **longest**
 * matching key. If a key's length equals the model name's length (exact match), it
 * returns immediately — no further keys are checked.
 *
 * For keys of different lengths, definition order does not affect the result — the
 * longest match always wins. For **same-length ties**, the function iterates in
 * reverse, so the last-defined key wins. Key ordering therefore matters for:
 * 1. **Performance**: list older/legacy models first, newer models last — newer
 *    models are more commonly used and will match earlier in the reverse scan.
 * 2. **Same-length tie-breaking**: when two keys of equal length both match,
 *    the last-defined key wins.
 */
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
export interface TxDeps {
    /** From @askargus/api — matches a model name to a canonical key. */
    matchModelName: (model: string, endpoint?: string) => string | undefined;
    /** From @askargus/api — finds the longest key in `values` whose key is a substring of `model`. */
    findMatchingPattern: (model: string, values: Record<string, number | Record<string, number>>) => string | undefined;
}
export declare const defaultRate = 6;
/**
 * Mapping of model token sizes to their respective multipliers for prompt and completion.
 * The rates are 1 USD per 1M tokens.
 */
export declare const tokenValues: Record<string, {
    prompt: number;
    completion: number;
}>;
/**
 * Mapping of model token sizes to their respective multipliers for cached input, read and write.
 * The rates are 1 USD per 1M tokens.
 */
export declare const cacheTokenValues: Record<string, {
    write: number;
    read: number;
}>;
/**
 * Premium (tiered) pricing for models whose rates change based on prompt size.
 */
export declare const premiumTokenValues: Record<string, {
    threshold: number;
    prompt: number;
    completion: number;
}>;
export declare function createTxMethods(_mongoose: typeof import('mongoose'), txDeps: TxDeps): {
    tokenValues: Record<string, {
        prompt: number;
        completion: number;
    }>;
    premiumTokenValues: Record<string, {
        threshold: number;
        prompt: number;
        completion: number;
    }>;
    getValueKey: (model: string, endpoint?: string) => string | undefined;
    getMultiplier: ({ model, valueKey, endpoint, tokenType, inputTokenCount, endpointTokenConfig, }: {
        model?: string | undefined;
        valueKey?: string | undefined;
        endpoint?: string | undefined;
        tokenType?: "completion" | "prompt" | undefined;
        inputTokenCount?: number | undefined;
        endpointTokenConfig?: Record<string, Record<string, number>> | undefined;
    }) => number;
    getPremiumRate: (valueKey: string, tokenType: string, inputTokenCount?: number | null) => number | null;
    getCacheMultiplier: ({ valueKey, cacheType, model, endpoint, endpointTokenConfig, }: {
        valueKey?: string | undefined;
        cacheType?: "read" | "write" | undefined;
        model?: string | undefined;
        endpoint?: string | undefined;
        endpointTokenConfig?: Record<string, Record<string, number>> | undefined;
    }) => number | null;
    defaultRate: number;
    cacheTokenValues: Record<string, {
        write: number;
        read: number;
    }>;
};
export type TxMethods = ReturnType<typeof createTxMethods>;
