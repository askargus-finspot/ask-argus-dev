import type { AppConfig, IConfig } from '~/types';
/**
 * Merge DB config overrides into a base AppConfig.
 *
 * Configs are sorted by priority ascending (lowest first, highest wins).
 * Each config's `overrides` is deep-merged into the base config in order.
 */
export declare function mergeConfigOverrides(baseConfig: AppConfig, configs: IConfig[]): AppConfig;
