import { Providers } from '@askargus/agents';
import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest, StrategyFunctions, AudioResult } from '~/types';
/**
 * Encodes and formats audio files for different providers
 * @param req - The request object
 * @param files - Array of audio files
 * @param params - Object containing provider and optional endpoint
 * @param params.provider - The provider to format for (currently only google is supported)
 * @param params.endpoint - Optional endpoint name for file config lookup
 * @param getStrategyFunctions - Function to get strategy functions
 * @returns Promise that resolves to audio and file metadata
 */
export declare function encodeAndFormatAudios(req: ServerRequest, files: IMongoFile[], params: {
    provider: Providers;
    endpoint?: string;
}, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<AudioResult>;
//# sourceMappingURL=audio.d.ts.map