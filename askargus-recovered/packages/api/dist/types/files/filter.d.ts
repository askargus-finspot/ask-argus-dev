import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest } from '~/types';
/**
 * Filters out files based on endpoint configuration including:
 * - Disabled status
 * - File size limits
 * - MIME type restrictions
 * - Total size limits
 * @param req - The server request object containing config
 * @param params - Object containing files, endpoint, and endpointType
 * @param params.files - Array of processed file documents from MongoDB
 * @param params.endpoint - The endpoint name to check configuration for
 * @param params.endpointType - The endpoint type to check configuration for
 * @returns Filtered array of files
 */
export declare function filterFilesByEndpointConfig(req: ServerRequest, params: {
    files: IMongoFile[] | undefined;
    endpoint?: string | null;
    endpointType?: string | null;
}): IMongoFile[];
//# sourceMappingURL=filter.d.ts.map