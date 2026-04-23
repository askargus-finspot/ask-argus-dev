import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';
import type { ClientOptions } from '@anthropic-ai/sdk';
import type { AnthropicCredentials, VertexAIClientOptions } from '~/types/anthropic';
/**
 * Options for loading Vertex AI credentials
 */
export interface VertexCredentialOptions {
    /** Path to service account key file (overrides env var) */
    serviceKeyFile?: string;
    /** Project ID for Vertex AI */
    projectId?: string;
    /** Region for Vertex AI */
    region?: string;
}
/**
 * Interface for Vertex AI configuration from YAML config.
 * This matches the TVertexAISchema from askargus-data-provider.
 */
export interface VertexAIConfigInput {
    enabled?: boolean;
    projectId?: string;
    region?: string;
    serviceKeyFile?: string;
    deploymentName?: string;
    models?: string[] | Record<string, boolean | {
        deploymentName?: string;
    }>;
}
/**
 * Loads Google service account configuration for Vertex AI.
 * Supports both YAML configuration and environment variables.
 * @param options - Optional configuration from YAML or other sources
 */
export declare function loadAnthropicVertexCredentials(options?: VertexCredentialOptions): Promise<AnthropicCredentials>;
/**
 * Creates Vertex credential options from a Vertex AI configuration object.
 * @param config - The Vertex AI configuration (from YAML config or other sources)
 */
export declare function getVertexCredentialOptions(config?: VertexAIConfigInput): VertexCredentialOptions;
/**
 * Checks if credentials are for Vertex AI (has service account key but no API key)
 */
export declare function isAnthropicVertexCredentials(credentials: AnthropicCredentials): boolean;
/**
 * Gets the deployment name for a given model name from the Vertex AI configuration.
 * Maps visible model names to actual deployment names (model IDs).
 * @param modelName - The visible model name (e.g., "Claude Opus 4.5")
 * @param vertexConfig - The Vertex AI configuration with model mappings
 * @returns The deployment name to use with the API (e.g., "claude-opus-4-5@20251101")
 */
export declare function getVertexDeploymentName(modelName: string, vertexConfig?: VertexAIConfigInput): string;
/**
 * Creates and configures a Vertex AI client for Anthropic.
 * Supports both YAML configuration and environment variables for region/projectId.
 * The projectId is automatically extracted from the service key if not explicitly provided.
 * @param credentials - The Google service account credentials
 * @param options - SDK client options
 * @param vertexOptions - Vertex AI specific options (region, projectId) from YAML config
 */
export declare function createAnthropicVertexClient(credentials: AnthropicCredentials, options?: ClientOptions, vertexOptions?: VertexAIClientOptions): AnthropicVertex;
//# sourceMappingURL=vertex.d.ts.map