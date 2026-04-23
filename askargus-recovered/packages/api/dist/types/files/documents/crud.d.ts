/// <reference types="multer" />
import type { MistralOCRUploadResult } from '~/types';
/**
 * Parses an uploaded document and extracts its text content and metadata.
 * Handled types must stay in sync with `documentParserMimeTypes` from data-provider.
 *
 * @throws {Error} if `file.mimetype` is not handled, file exceeds size limit, or no text is found.
 */
export declare function parseDocument({ file, }: {
    file: Express.Multer.File;
}): Promise<MistralOCRUploadResult>;
//# sourceMappingURL=crud.d.ts.map