/// <reference types="node" />
import { Readable } from 'stream';
import type { TFile } from 'askargus-data-provider';
import type { ServerRequest } from '~/types';
import type { UploadFileParams, SaveBufferParams, BatchUpdateFn, SaveURLParams, GetURLParams, UploadResult, S3FileRef } from '~/storage/types';
export declare const getS3Key: (basePath: string, userId: string, fileName: string) => string;
export declare function getS3URL({ userId, fileName, basePath, customFilename, contentType, }: GetURLParams): Promise<string>;
export declare function saveBufferToS3({ userId, buffer, fileName, basePath, }: SaveBufferParams): Promise<string>;
export declare function saveURLToS3({ userId, URL, fileName, basePath, }: SaveURLParams): Promise<string>;
export declare function extractKeyFromS3Url(fileUrlOrKey: string): string;
export declare function deleteFileFromS3(req: ServerRequest, file: TFile): Promise<void>;
export declare function uploadFileToS3({ req, file, file_id, basePath, }: UploadFileParams): Promise<UploadResult>;
export declare function getS3FileStream(_req: ServerRequest, filePath: string): Promise<Readable>;
export declare function needsRefresh(signedUrl: string, bufferSeconds: number): boolean;
export declare function getNewS3URL(currentURL: string): Promise<string | undefined>;
export declare function refreshS3FileUrls(files: TFile[] | null | undefined, batchUpdateFiles: BatchUpdateFn, bufferSeconds?: number): Promise<TFile[]>;
export declare function refreshS3Url(fileObj: S3FileRef, bufferSeconds?: number): Promise<string>;
//# sourceMappingURL=crud.d.ts.map