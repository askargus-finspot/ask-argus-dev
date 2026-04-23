import { z } from 'zod';
import type { EndpointFileConfig, FileConfig } from './types/files';
export declare const supportsFiles: {
    openAI: boolean;
    google: boolean;
    assistants: boolean;
    azureAssistants: boolean;
    agents: boolean;
    azureOpenAI: boolean;
    anthropic: boolean;
    custom: boolean;
    bedrock: boolean;
};
export declare const excelFileTypes: string[];
export declare const fullMimeTypesList: string[];
export declare const codeInterpreterMimeTypesList: string[];
export declare const retrievalMimeTypesList: string[];
export declare const imageExtRegex: RegExp;
/** @see https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_DocumentBlock.html */
export type BedrockDocumentFormat = 'pdf' | 'csv' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'html' | 'txt' | 'md';
/** Maps MIME types to Bedrock Converse API document format values */
export declare const bedrockDocumentFormats: Record<string, BedrockDocumentFormat>;
export declare const isBedrockDocumentType: (mimeType?: string) => boolean;
/** File extensions accepted by Bedrock document uploads (for input accept attributes) */
export declare const bedrockDocumentExtensions = ".pdf,.csv,.doc,.docx,.xls,.xlsx,.html,.htm,.txt,.md,application/pdf,text/csv,application/csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/html,text/plain,text/markdown";
export declare const excelMimeTypes: RegExp;
export declare const textMimeTypes: RegExp;
export declare const applicationMimeTypes: RegExp;
export declare const imageMimeTypes: RegExp;
export declare const audioMimeTypes: RegExp;
export declare const videoMimeTypes: RegExp;
export declare const defaultOCRMimeTypes: RegExp[];
/** MIME types handled by the built-in document parser (pdf, docx, excel variants, ods/odt) */
export declare const documentParserMimeTypes: RegExp[];
export declare const defaultTextMimeTypes: RegExp[];
export declare const defaultSTTMimeTypes: RegExp[];
export declare const supportedMimeTypes: RegExp[];
export declare const codeInterpreterMimeTypes: RegExp[];
export declare const codeTypeMapping: {
    [key: string]: string;
};
/** Maps image extensions to MIME types for formats browsers may not recognize */
export declare const imageTypeMapping: {
    [key: string]: string;
};
/** Normalizes non-standard MIME types that browsers may report to their canonical forms */
export declare const mimeTypeAliases: Readonly<Record<string, string>>;
/**
 * Infers the MIME type from a file's extension when the browser doesn't recognize it,
 * and normalizes known non-standard MIME type aliases to their canonical forms.
 * @param fileName - The file name including its extension
 * @param currentType - The MIME type reported by the browser (may be empty string)
 * @returns The normalized or inferred MIME type; empty string if unresolvable
 */
export declare function inferMimeType(fileName: string, currentType: string): string;
export declare const retrievalMimeTypes: RegExp[];
export declare const megabyte: number;
/** Helper function to get megabytes value */
export declare const mbToBytes: (mb: number) => number;
export declare const fileConfig: {
    endpoints: {
        assistants: {
            fileLimit: number;
            fileSizeLimit: number;
            totalSizeLimit: number;
            supportedMimeTypes: RegExp[];
            disabled: boolean;
        };
        azureAssistants: {
            fileLimit: number;
            fileSizeLimit: number;
            totalSizeLimit: number;
            supportedMimeTypes: RegExp[];
            disabled: boolean;
        };
        agents: {
            fileLimit: number;
            fileSizeLimit: number;
            totalSizeLimit: number;
            supportedMimeTypes: RegExp[];
            disabled: boolean;
        };
        anthropic: {
            fileLimit: number;
            fileSizeLimit: number;
            totalSizeLimit: number;
            supportedMimeTypes: RegExp[];
            disabled: boolean;
        };
        default: {
            fileLimit: number;
            fileSizeLimit: number;
            totalSizeLimit: number;
            supportedMimeTypes: RegExp[];
            disabled: boolean;
        };
    };
    serverFileSizeLimit: number;
    avatarSizeLimit: number;
    fileTokenLimit: number;
    clientImageResize: {
        enabled: boolean;
        maxWidth: number;
        maxHeight: number;
        quality: number;
    };
    ocr: {
        supportedMimeTypes: RegExp[];
    };
    text: {
        supportedMimeTypes: RegExp[];
    };
    stt: {
        supportedMimeTypes: RegExp[];
    };
    checkType: (fileType: string, supportedTypes?: RegExp[]) => boolean;
};
export declare const endpointFileConfigSchema: z.ZodObject<{
    disabled: z.ZodOptional<z.ZodBoolean>;
    fileLimit: z.ZodOptional<z.ZodNumber>;
    fileSizeLimit: z.ZodOptional<z.ZodNumber>;
    totalSizeLimit: z.ZodOptional<z.ZodNumber>;
    supportedMimeTypes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    disabled?: boolean | undefined;
    fileLimit?: number | undefined;
    fileSizeLimit?: number | undefined;
    totalSizeLimit?: number | undefined;
    supportedMimeTypes?: string[] | undefined;
}, {
    disabled?: boolean | undefined;
    fileLimit?: number | undefined;
    fileSizeLimit?: number | undefined;
    totalSizeLimit?: number | undefined;
    supportedMimeTypes?: string[] | undefined;
}>;
export declare const fileConfigSchema: z.ZodObject<{
    endpoints: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        disabled: z.ZodOptional<z.ZodBoolean>;
        fileLimit: z.ZodOptional<z.ZodNumber>;
        fileSizeLimit: z.ZodOptional<z.ZodNumber>;
        totalSizeLimit: z.ZodOptional<z.ZodNumber>;
        supportedMimeTypes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        disabled?: boolean | undefined;
        fileLimit?: number | undefined;
        fileSizeLimit?: number | undefined;
        totalSizeLimit?: number | undefined;
        supportedMimeTypes?: string[] | undefined;
    }, {
        disabled?: boolean | undefined;
        fileLimit?: number | undefined;
        fileSizeLimit?: number | undefined;
        totalSizeLimit?: number | undefined;
        supportedMimeTypes?: string[] | undefined;
    }>>>;
    serverFileSizeLimit: z.ZodOptional<z.ZodNumber>;
    avatarSizeLimit: z.ZodOptional<z.ZodNumber>;
    fileTokenLimit: z.ZodOptional<z.ZodNumber>;
    imageGeneration: z.ZodOptional<z.ZodObject<{
        percentage: z.ZodOptional<z.ZodNumber>;
        px: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        percentage?: number | undefined;
        px?: number | undefined;
    }, {
        percentage?: number | undefined;
        px?: number | undefined;
    }>>;
    clientImageResize: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        maxWidth: z.ZodOptional<z.ZodNumber>;
        maxHeight: z.ZodOptional<z.ZodNumber>;
        quality: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled?: boolean | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        quality?: number | undefined;
    }, {
        enabled?: boolean | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        quality?: number | undefined;
    }>>;
    ocr: z.ZodOptional<z.ZodObject<{
        supportedMimeTypes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        supportedMimeTypes?: string[] | undefined;
    }, {
        supportedMimeTypes?: string[] | undefined;
    }>>;
    text: z.ZodOptional<z.ZodObject<{
        supportedMimeTypes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        supportedMimeTypes?: string[] | undefined;
    }, {
        supportedMimeTypes?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    endpoints?: Record<string, {
        disabled?: boolean | undefined;
        fileLimit?: number | undefined;
        fileSizeLimit?: number | undefined;
        totalSizeLimit?: number | undefined;
        supportedMimeTypes?: string[] | undefined;
    }> | undefined;
    serverFileSizeLimit?: number | undefined;
    avatarSizeLimit?: number | undefined;
    fileTokenLimit?: number | undefined;
    imageGeneration?: {
        percentage?: number | undefined;
        px?: number | undefined;
    } | undefined;
    clientImageResize?: {
        enabled?: boolean | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        quality?: number | undefined;
    } | undefined;
    ocr?: {
        supportedMimeTypes?: string[] | undefined;
    } | undefined;
    text?: {
        supportedMimeTypes?: string[] | undefined;
    } | undefined;
}, {
    endpoints?: Record<string, {
        disabled?: boolean | undefined;
        fileLimit?: number | undefined;
        fileSizeLimit?: number | undefined;
        totalSizeLimit?: number | undefined;
        supportedMimeTypes?: string[] | undefined;
    }> | undefined;
    serverFileSizeLimit?: number | undefined;
    avatarSizeLimit?: number | undefined;
    fileTokenLimit?: number | undefined;
    imageGeneration?: {
        percentage?: number | undefined;
        px?: number | undefined;
    } | undefined;
    clientImageResize?: {
        enabled?: boolean | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        quality?: number | undefined;
    } | undefined;
    ocr?: {
        supportedMimeTypes?: string[] | undefined;
    } | undefined;
    text?: {
        supportedMimeTypes?: string[] | undefined;
    } | undefined;
}>;
export type TFileConfig = z.infer<typeof fileConfigSchema>;
/** Helper function to safely convert string patterns to RegExp objects */
export declare const convertStringsToRegex: (patterns: string[]) => RegExp[];
export declare function getEndpointFileConfig(params: {
    fileConfig?: FileConfig | null;
    endpoint?: string | null;
    endpointType?: string | null;
}): EndpointFileConfig;
export declare function mergeFileConfig(dynamic: z.infer<typeof fileConfigSchema> | undefined): FileConfig;
