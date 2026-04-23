import type { BaseInitializeParams, InitializeResultBase } from '~/types';
/**
 * Initializes Google/Vertex AI endpoint configuration.
 * Supports both API key authentication and service account credentials.
 *
 * @param params - Configuration parameters
 * @returns Promise resolving to Google configuration options
 * @throws Error if no valid credentials are provided
 */
export declare function initializeGoogle({ req, endpoint, model_parameters, db, }: BaseInitializeParams): Promise<InitializeResultBase>;
//# sourceMappingURL=initialize.d.ts.map