import type { GoogleAIToolType } from '@langchain/google-common';
import type { ClientOptions } from '@askargus/agents';
import type * as t from '~/types';
export type ConfigTools = Array<Record<string, unknown>> | Array<GoogleAIToolType>;
/**
 * Transforms a Non-OpenAI LLM config to an OpenAI-conformant config.
 * Non-OpenAI parameters are moved to modelKwargs.
 * Also extracts configuration options that belong in configOptions.
 * Handles addParams and dropParams for parameter customization.
 * Filters out provider-specific tools that have no OpenAI equivalent.
 */
export declare function transformToOpenAIConfig({ tools, addParams, dropParams, defaultParams, llmConfig, fromEndpoint, }: {
    tools?: ConfigTools;
    addParams?: Record<string, unknown>;
    dropParams?: string[];
    defaultParams?: Record<string, unknown>;
    llmConfig: ClientOptions;
    fromEndpoint: string;
}): {
    tools: ConfigTools;
    llmConfig: t.OAIClientOptions;
    configOptions: Partial<t.OpenAIConfiguration>;
};
//# sourceMappingURL=transform.d.ts.map