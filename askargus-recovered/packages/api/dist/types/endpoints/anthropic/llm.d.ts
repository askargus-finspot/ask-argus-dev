import type { AnthropicLLMConfigResult, AnthropicConfigOptions, AnthropicCredentials } from '~/types/anthropic';
/** Known Anthropic parameters that map directly to the client config */
export declare const knownAnthropicParams: Set<string>;
/**
 * Generates configuration options for creating an Anthropic language model (LLM) instance.
 * @param credentials - The API key for authentication with Anthropic, or credentials object for Vertex AI.
 * @param options={} - Additional options for configuring the LLM.
 * @returns Configuration options for creating an Anthropic LLM instance, with null and undefined values removed.
 */
declare function getLLMConfig(credentials: string | AnthropicCredentials | undefined, options?: AnthropicConfigOptions): AnthropicLLMConfigResult;
export { getLLMConfig };
//# sourceMappingURL=llm.d.ts.map