import type { IMongoFile } from '@askargus/data-schemas';
import type { ServerRequest } from '~/types';
/**
 * Extracts text context from attachments and returns formatted text.
 * This handles text that was already extracted from files (OCR, transcriptions, document text, etc.)
 * @param params - The parameters object
 * @param params.attachments - Array of file attachments
 * @param params.req - Express request object for config access
 * @param params.tokenCountFn - Function to count tokens in text
 * @returns The formatted file context text, or undefined if no text found
 */
export declare function extractFileContext({ attachments, req, tokenCountFn, }: {
    attachments: IMongoFile[];
    req?: ServerRequest;
    tokenCountFn: (text: string) => number;
}): Promise<string | undefined>;
//# sourceMappingURL=context.d.ts.map