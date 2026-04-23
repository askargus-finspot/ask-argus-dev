import type { TEndpoint } from 'askargus-data-provider';
import type { AppConfig } from '@askargus/data-schemas';
import type { BaseInitializeParams, InitializeResultBase } from '~/types';
/**
 * Type for initialize functions
 */
export type InitializeFn = (params: BaseInitializeParams) => Promise<InitializeResultBase>;
/**
 * Check if the provider is a known custom provider
 * @param provider - The provider string
 * @returns True if the provider is a known custom provider, false otherwise
 */
export declare function isKnownCustomProvider(provider?: string): boolean;
/**
 * Provider configuration map mapping providers to their initialization functions
 */
export declare const providerConfigMap: Record<string, InitializeFn>;
/**
 * Result from getProviderConfig
 */
export interface ProviderConfigResult {
    /** The initialization function for this provider */
    getOptions: InitializeFn;
    /** The resolved provider name (may be different from input if normalized) */
    overrideProvider: string;
    /** Custom endpoint configuration (if applicable) */
    customEndpointConfig?: Partial<TEndpoint>;
}
/**
 * Get the provider configuration and override endpoint based on the provider string
 *
 * @param params - Configuration parameters
 * @param params.provider - The provider string
 * @param params.appConfig - The application configuration
 * @returns Provider configuration including getOptions function, override provider, and custom config
 * @throws Error if provider is not supported
 */
export declare function getProviderConfig({ provider, appConfig, }: {
    provider: string;
    appConfig?: AppConfig;
}): ProviderConfigResult;
//# sourceMappingURL=providers.d.ts.map