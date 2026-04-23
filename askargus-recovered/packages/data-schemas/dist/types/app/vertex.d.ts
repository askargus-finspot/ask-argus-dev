import type { TCustomConfig, TVertexAISchema, TVertexAIConfig } from 'askargus-data-provider';
/**
 * Default Vertex AI models available through Google Cloud
 * These are the standard Anthropic model names as served by Vertex AI
 */
export declare const defaultVertexModels: string[];
/**
 * Validates and processes Vertex AI configuration
 * @param vertexConfig - The Vertex AI configuration object
 * @returns Validated configuration with errors if any
 */
export declare function validateVertexConfig(vertexConfig: TVertexAISchema | undefined): TVertexAIConfig | null;
/**
 * Sets up the Vertex AI configuration from the config (`askargus.yaml`) file.
 * Similar to azureConfigSetup, this processes and validates the Vertex AI configuration.
 * @param config - The loaded custom configuration.
 * @returns The validated Vertex AI configuration or null if not configured.
 */
export declare function vertexConfigSetup(config: Partial<TCustomConfig>): TVertexAIConfig | null;
