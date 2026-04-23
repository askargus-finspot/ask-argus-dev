import { Providers } from '@askargus/agents';
import type { IMongoFile } from '@askargus/data-schemas';
import type { StrategyFunctions, DocumentResult, ServerRequest } from '~/types';
/**
 * Encodes and formats document files for various providers.
 *
 * Callers are responsible for pre-filtering `files` to types the endpoint accepts
 * (e.g., via `supportedMimeTypes` in `processAttachments`). This function processes
 * every file it receives and dispatches to the appropriate provider format:
 * - **Bedrock**: Only encodes types in `bedrockDocumentFormats`; all others are skipped.
 * - **PDF**: Validated via `validatePdf` before encoding.
 * - **Generic types**: Encoded with a provider-specific size check.
 */
export declare function encodeAndFormatDocuments(req: ServerRequest, files: IMongoFile[], params: {
    provider: Providers;
    endpoint?: string;
    useResponsesApi?: boolean;
    model?: string;
}, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<DocumentResult>;
//# sourceMappingURL=document.d.ts.map