export type EncodingName = 'o200k_base' | 'claude';
declare class Tokenizer {
    private tokenizersCache;
    private loadingPromises;
    /** Pre-loads an encoding so that subsequent getTokenCount calls are accurate. */
    initEncoding(encoding: EncodingName): Promise<void>;
    getTokenCount(text: string, encoding?: EncodingName): number;
}
declare const TokenizerSingleton: Tokenizer;
/**
 * Counts the number of tokens in a given text using ai-tokenizer with o200k_base encoding.
 * @param text - The text to count tokens in. Defaults to an empty string.
 * @returns The number of tokens in the provided text.
 */
export declare function countTokens(text?: string): Promise<number>;
export default TokenizerSingleton;
//# sourceMappingURL=tokenizer.d.ts.map