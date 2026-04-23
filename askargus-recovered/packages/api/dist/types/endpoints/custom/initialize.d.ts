import type { BaseInitializeParams, InitializeResultBase } from '~/types';
/**
 * Initializes a custom endpoint client configuration.
 * This function handles custom endpoints defined in askargus.yaml, including
 * user-provided API keys and URLs.
 *
 * @param params - Configuration parameters
 * @returns Promise resolving to endpoint configuration options
 * @throws Error if config is missing, API key is not provided, or base URL is missing
 */
export declare function initializeCustom({ req, endpoint, model_parameters, db, }: BaseInitializeParams): Promise<InitializeResultBase>;
//# sourceMappingURL=initialize.d.ts.map