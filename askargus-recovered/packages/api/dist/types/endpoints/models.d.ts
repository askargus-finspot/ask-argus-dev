import type { IUser } from '@askargus/data-schemas';
export interface FetchModelsParams {
    /** User ID for API requests */
    user?: string;
    /** API key for authentication */
    apiKey: string;
    /** Base URL for the API */
    baseURL?: string;
    /** Endpoint name (defaults to 'openAI') */
    name?: string;
    /** Whether directEndpoint was configured */
    direct?: boolean;
    /** Whether to fetch from Azure */
    azure?: boolean;
    /** Whether to send user ID as query parameter */
    userIdQuery?: boolean;
    /** Whether to create token configuration from API response */
    createTokenConfig?: boolean;
    /** Cache key for token configuration (uses name if omitted) */
    tokenKey?: string;
    /** Optional headers for the request */
    headers?: Record<string, string> | null;
    /** Optional user object for header resolution */
    userObject?: Partial<IUser>;
    /** Skip MODEL_QUERIES cache (e.g., for user-provided keys) */
    skipCache?: boolean;
}
/**
 * Splits a string by commas and trims each resulting value.
 * @param input - The input string to split.
 * @returns An array of trimmed values.
 */
export declare function splitAndTrim(input: string | null | undefined): string[];
/**
 * Fetches models from the specified base API path or Azure, based on the provided configuration.
 *
 * @param params - The parameters for fetching the models.
 * @returns A promise that resolves to an array of model identifiers.
 */
export declare function fetchModels({ user, apiKey, baseURL: _baseURL, name, direct, azure, userIdQuery, createTokenConfig, tokenKey, headers, userObject, skipCache, }: FetchModelsParams): Promise<string[]>;
/** Options for fetching OpenAI models */
export interface GetOpenAIModelsOptions {
    /** User ID for API requests */
    user?: string;
    /** Whether to fetch from Azure */
    azure?: boolean;
    /** Whether to fetch models for the Assistants endpoint */
    assistants?: boolean;
    /** OpenAI API key (if not using environment variable) */
    openAIApiKey?: string;
    /** Whether user provides their own API key */
    userProvidedOpenAI?: boolean;
    /** Skip MODEL_QUERIES cache (e.g., for user-provided keys) */
    skipCache?: boolean;
}
/**
 * Fetches models from OpenAI or Azure based on the provided options.
 * @param opts - Options for fetching models
 * @param _models - Fallback models array
 * @returns Promise resolving to array of model IDs
 */
export declare function fetchOpenAIModels(opts: GetOpenAIModelsOptions, _models?: string[]): Promise<string[]>;
/**
 * Loads the default models for OpenAI or Azure.
 * @param opts - Options for getting models
 * @returns Promise resolving to array of model IDs
 */
export declare function getOpenAIModels(opts?: GetOpenAIModelsOptions): Promise<string[]>;
/**
 * Fetches models from the Anthropic API.
 * @param opts - Options for fetching models
 * @param _models - Fallback models array
 * @returns Promise resolving to array of model IDs
 */
export declare function fetchAnthropicModels(opts?: {
    user?: string;
    skipCache?: boolean;
}, _models?: string[]): Promise<string[]>;
/**
 * Gets Anthropic models from environment or API.
 * @param opts - Options for fetching models
 * @returns Promise resolving to array of model IDs
 */
export declare function getAnthropicModels(opts?: {
    user?: string;
    vertexModels?: string[];
}): Promise<string[]>;
/**
 * Gets Google models from environment or defaults.
 * @returns Array of model IDs
 */
export declare function getGoogleModels(): string[];
/**
 * Gets Bedrock models from environment or defaults.
 * @returns Array of model IDs
 */
export declare function getBedrockModels(): string[];
//# sourceMappingURL=models.d.ts.map