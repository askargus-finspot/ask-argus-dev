import type { TFile, TMessage } from 'askargus-data-provider';
/** Minimal shape for request file entries (from `req.body.files`) */
type RequestFile = {
    file_id?: string;
};
/** Fields to strip from files before client transmission */
declare const FILE_STRIP_FIELDS: readonly ["text", "_id", "__v"];
/** Fields to strip from messages before client transmission */
declare const MESSAGE_STRIP_FIELDS: readonly ["fileContext"];
/**
 * Strips large/unnecessary fields from a file object before transmitting to client.
 * Use this within existing loops when building file arrays to avoid extra iterations.
 *
 * @param file - The file object to sanitize
 * @returns A new file object without the stripped fields
 *
 * @example
 * // Use in existing file processing loop:
 * for (const attachment of client.options.attachments) {
 *   if (messageFiles.has(attachment.file_id)) {
 *     userMessage.files.push(sanitizeFileForTransmit(attachment));
 *   }
 * }
 */
export declare function sanitizeFileForTransmit<T extends Partial<TFile>>(file: T): Omit<T, (typeof FILE_STRIP_FIELDS)[number]>;
/** Filters attachments to those whose `file_id` appears in `requestFiles`, then sanitizes each. */
export declare function buildMessageFiles<T extends Partial<TFile>>(requestFiles: RequestFile[], attachments: T[]): Omit<T, (typeof FILE_STRIP_FIELDS)[number]>[];
/**
 * Sanitizes a message object before transmitting to client.
 * Removes large fields like `fileContext` and strips `text` from embedded files.
 *
 * @param message - The message object to sanitize
 * @returns A new message object safe for client transmission
 *
 * @example
 * sendEvent(res, {
 *   final: true,
 *   requestMessage: sanitizeMessageForTransmit(userMessage),
 *   responseMessage: response,
 * });
 */
export declare function sanitizeMessageForTransmit<T extends Partial<TMessage>>(message: T): Omit<T, (typeof MESSAGE_STRIP_FIELDS)[number]>;
/** Minimal message shape for thread traversal */
type ThreadMessage = {
    messageId: string;
    parentMessageId?: string | null;
    files?: Array<{
        file_id?: string;
    }>;
};
/** Result of thread data extraction */
export type ThreadData = {
    messageIds: string[];
    fileIds: string[];
};
/**
 * Extracts thread message IDs and file IDs in a single O(n) pass.
 * Builds a Map for O(1) lookups, then traverses the thread collecting both IDs.
 *
 * @param messages - All messages in the conversation (should be queried with select for efficiency)
 * @param parentMessageId - The ID of the parent message to start traversal from
 * @returns Object containing messageIds and fileIds arrays
 */
export declare function getThreadData(messages: ThreadMessage[], parentMessageId: string | null | undefined): ThreadData;
export {};
//# sourceMappingURL=message.d.ts.map