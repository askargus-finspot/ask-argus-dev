import { Providers } from '@askargus/agents';
import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest, StrategyFunctions, ProcessedFile } from '~/types';
/**
 * Extracts the configured file size limit for a specific provider from fileConfig
 * @param req - The server request object containing config
 * @param params - Object containing provider and optional endpoint
 * @param params.provider - The provider to get the limit for
 * @param params.endpoint - Optional endpoint name for lookup
 * @returns The configured file size limit in bytes, or undefined if not configured
 */
export declare const getConfiguredFileSizeLimit: (req: ServerRequest, params: {
    provider: Providers;
    endpoint?: string;
}) => number | undefined;
/**
 * Processes a file by downloading and encoding it to base64
 * @param req - Express request object
 * @param file - File object to process
 * @param encodingMethods - Cache of encoding methods by source
 * @param getStrategyFunctions - Function to get strategy functions for a source
 * @returns Processed file with content and metadata, or null if filepath missing
 */
export declare function getFileStream(req: ServerRequest, file: IMongoFile, encodingMethods: Record<string, StrategyFunctions>, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<ProcessedFile | null>;
//# sourceMappingURL=utils.d.ts.map