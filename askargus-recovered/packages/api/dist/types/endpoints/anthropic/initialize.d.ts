import type { BaseInitializeParams, InitializeResultBase } from '~/types';
/**
 * Initializes Anthropic endpoint configuration.
 * Supports both direct API key authentication and Google Cloud Vertex AI.
 *
 * @param params - Configuration parameters
 * @returns Promise resolving to Anthropic configuration options
 * @throws Error if API key is not provided (when not using Vertex AI)
 */
export declare function initializeAnthropic({ req, endpoint, model_parameters, db, }: BaseInitializeParams): Promise<InitializeResultBase>;
//# sourceMappingURL=initialize.d.ts.map