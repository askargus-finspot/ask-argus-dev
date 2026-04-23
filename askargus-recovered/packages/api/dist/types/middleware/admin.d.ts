import type { NextFunction, Response } from 'express';
import type { ServerRequest } from '~/types/http';
/**
 * Middleware to check if authenticated user has admin role.
 * Should be used AFTER authentication middleware (requireJwtAuth, requireLocalAuth, etc.)
 */
export declare const requireAdmin: (req: ServerRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=admin.d.ts.map