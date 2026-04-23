import { AnthropicClientOptions } from '@askargus/agents';
import { AnthropicEffort, supportsAdaptiveThinking } from 'askargus-data-provider';
/**
 * @param {string} modelName
 * @returns {boolean}
 */
declare function checkPromptCacheSupport(modelName: string): boolean;
/**
 * Gets the appropriate headers for Claude models with cache control
 * @param {string} model The model name
 * @param {boolean} supportsCacheControl Whether the model supports cache control
 * @returns {AnthropicClientOptions['extendedOptions']['defaultHeaders']|undefined} The headers object or undefined if not applicable
 */
declare function getClaudeHeaders(model: string, supportsCacheControl: boolean): Record<string, string> | undefined;
/**
 * Configures reasoning-related options for Claude models.
 * Models supporting adaptive thinking (Opus 4.6+, Sonnet 4.6+) use effort control instead of manual budget_tokens.
 */
declare function configureReasoning(anthropicInput: AnthropicClientOptions & {
    max_tokens?: number;
}, extendedOptions?: {
    thinking?: boolean;
    thinkingBudget?: number | null;
    effort?: AnthropicEffort | string | null;
}): AnthropicClientOptions & {
    max_tokens?: number;
};
export { checkPromptCacheSupport, getClaudeHeaders, configureReasoning, supportsAdaptiveThinking };
//# sourceMappingURL=helpers.d.ts.map