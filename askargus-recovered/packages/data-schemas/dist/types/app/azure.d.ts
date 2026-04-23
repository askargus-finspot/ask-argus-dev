import type { TCustomConfig, TAzureConfig } from 'askargus-data-provider';
/**
 * Sets up the Azure OpenAI configuration from the config (`askargus.yaml`) file.
 * @param config - The loaded custom configuration.
 * @returns The Azure OpenAI configuration.
 */
export declare function azureConfigSetup(config: Partial<TCustomConfig>): TAzureConfig;
