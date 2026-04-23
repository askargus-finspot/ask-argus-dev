import { Providers } from '@askargus/agents';
import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest, StrategyFunctions, VideoResult } from '~/types';
/**
 * Encodes and formats video files for different providers
 * @param req - The request object
 * @param files - Array of video files
 * @param params - Object containing provider and optional endpoint
 * @param params.provider - The provider to format for
 * @param params.endpoint - Optional endpoint name for file config lookup
 * @param getStrategyFunctions - Function to get strategy functions
 * @returns Promise that resolves to videos and file metadata
 */
export declare function encodeAndFormatVideos(req: ServerRequest, files: IMongoFile[], params: {
    provider: Providers;
    endpoint?: string;
}, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<VideoResult>;
//# sourceMappingURL=video.d.ts.map