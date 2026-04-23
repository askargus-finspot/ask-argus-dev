import type { Request, Response, NextFunction } from 'express';
/**
 * Middleware to handle JSON parsing errors from express.json()
 * Prevents user input from being reflected in error messages (XSS prevention)
 *
 * This middleware should be placed immediately after express.json() middleware.
 *
 * @param err - Error object from express.json()
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 *
 * @example
 * app.use(express.json({ limit: '3mb' }));
 * app.use(handleJsonParseError);
 */
export declare function handleJsonParseError(err: Error & {
    status?: number;
    body?: unknown;
}, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=json.d.ts.map