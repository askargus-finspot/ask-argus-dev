/// <reference types="node" />
import type { IUser } from '@askargus/data-schemas';
import type { TFile } from 'askargus-data-provider';
import type { UploadImageParams, ImageUploadResult, ProcessAvatarParams } from '~/storage/types';
export interface S3ImageServiceDeps {
    resizeImageBuffer: (buffer: Buffer, resolution: string, endpoint: string) => Promise<{
        buffer: Buffer;
        width: number;
        height: number;
    }>;
    updateUser: (userId: string, update: {
        avatar: string;
    }) => Promise<IUser | null>;
    updateFile: (params: {
        file_id: string;
    }) => Promise<TFile>;
}
export declare class S3ImageService {
    private deps;
    constructor(deps: S3ImageServiceDeps);
    uploadImageToS3({ req, file, file_id, endpoint, resolution, basePath, }: UploadImageParams): Promise<ImageUploadResult>;
    prepareImageURL(file: {
        file_id: string;
        filepath: string;
    }): Promise<[TFile, string]>;
    processAvatar({ buffer, userId, manual, agentId, basePath, }: ProcessAvatarParams): Promise<string>;
}
//# sourceMappingURL=images.d.ts.map