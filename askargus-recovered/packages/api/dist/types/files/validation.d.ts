/// <reference types="node" />
import { Providers } from '@askargus/agents';
export interface ValidationResult {
    isValid: boolean;
    error?: string;
}
export interface PDFValidationResult {
    isValid: boolean;
    error?: string;
}
export interface VideoValidationResult {
    isValid: boolean;
    error?: string;
}
export interface AudioValidationResult {
    isValid: boolean;
    error?: string;
}
export interface ImageValidationResult {
    isValid: boolean;
    error?: string;
}
export declare function validatePdf(pdfBuffer: Buffer, fileSize: number, provider: Providers, configuredFileSizeLimit?: number, model?: string): Promise<PDFValidationResult>;
/**
 * Validates a document against Bedrock size limits. The default limit is 4.5 MB,
 * but Claude 4+ (PDF) and Nova (PDF/DOCX) models are exempt per AWS docs.
 * When exempt, falls back to a 32 MB request-level limit as a reasonable upper bound.
 * @param fileSize - The file size in bytes
 * @param mimeType - The MIME type of the document
 * @param fileBuffer - The file buffer (used for PDF header validation)
 * @param configuredFileSizeLimit - Optional configured file size limit from fileConfig (in bytes)
 * @param model - Optional Bedrock model identifier for model-specific limit exceptions
 * @returns Promise that resolves to validation result
 */
export declare function validateBedrockDocument(fileSize: number, mimeType: string, fileBuffer?: Buffer, configuredFileSizeLimit?: number, model?: string): Promise<ValidationResult>;
/**
 * Validates video files for different providers
 * @param videoBuffer - The video file as a buffer
 * @param fileSize - The file size in bytes
 * @param provider - The provider to validate for
 * @param configuredFileSizeLimit - Optional configured file size limit from fileConfig (in bytes)
 * @returns Promise that resolves to validation result
 */
export declare function validateVideo(videoBuffer: Buffer, fileSize: number, provider: Providers, configuredFileSizeLimit?: number): Promise<VideoValidationResult>;
/**
 * Validates audio files for different providers
 * @param audioBuffer - The audio file as a buffer
 * @param fileSize - The file size in bytes
 * @param provider - The provider to validate for
 * @param configuredFileSizeLimit - Optional configured file size limit from fileConfig (in bytes)
 * @returns Promise that resolves to validation result
 */
export declare function validateAudio(audioBuffer: Buffer, fileSize: number, provider: Providers, configuredFileSizeLimit?: number): Promise<AudioValidationResult>;
/**
 * Validates image files for different providers
 * @param imageBuffer - The image file as a buffer
 * @param fileSize - The file size in bytes
 * @param provider - The provider to validate for
 * @param configuredFileSizeLimit - Optional configured file size limit from fileConfig (in bytes)
 * @returns Promise that resolves to validation result
 */
export declare function validateImage(imageBuffer: Buffer, fileSize: number, provider: Providers | string, configuredFileSizeLimit?: number): Promise<ImageValidationResult>;
//# sourceMappingURL=validation.d.ts.map