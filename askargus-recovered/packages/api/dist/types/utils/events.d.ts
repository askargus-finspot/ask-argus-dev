import type { Response as ServerResponse } from 'express';
import type { ServerSentEvent } from '~/types';
/**
 * Sends a Server-Sent Event to the client.
 * Empty-string StreamEvent data is silently dropped.
 */
export declare function sendEvent(res: ServerResponse, event: ServerSentEvent): void;
/**
 * Sends error data in Server Sent Events format and ends the response.
 * @param res - The server response.
 * @param message - The error message.
 */
export declare function handleError(res: ServerResponse, message: string): void;
//# sourceMappingURL=events.d.ts.map