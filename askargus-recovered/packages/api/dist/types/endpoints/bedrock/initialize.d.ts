import type { BaseInitializeParams, InitializeResultBase } from '~/types';
/**
 * Initializes Bedrock endpoint configuration.
 *
 * This module handles configuration for AWS Bedrock endpoints, including support for
 * HTTP/HTTPS proxies and reverse proxies.
 *
 * Proxy Support:
 * - When the PROXY environment variable is set, creates a custom BedrockRuntimeClient
 *   with an HttpsProxyAgent to route all Bedrock API calls through the specified proxy
 * - The custom client is fully configured with credentials, region, and endpoint,
 *   and is passed directly to ChatBedrockConverse via the 'client' parameter
 *
 * Reverse Proxy Support:
 * - When BEDROCK_REVERSE_PROXY is set, routes Bedrock API calls through a custom endpoint
 * - Works with or without the PROXY setting
 *
 * Without Proxy:
 * - Credentials and endpoint configuration are passed separately to ChatBedrockConverse,
 *   which creates its own BedrockRuntimeClient internally
 *
 * @param params - Configuration parameters
 * @returns Promise resolving to Bedrock configuration options
 * @throws Error if credentials are not provided when required
 */
export declare function initializeBedrock({ req, endpoint, model_parameters, db, }: BaseInitializeParams): Promise<InitializeResultBase>;
//# sourceMappingURL=initialize.d.ts.map