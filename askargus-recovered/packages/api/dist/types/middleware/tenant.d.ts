import type { Response, NextFunction } from 'express';
import type { ServerRequest } from '~/types/http';
/** Resets the cached strict-mode flag. Exposed for test teardown only. */
export declare function _resetTenantMiddlewareStrictCache(): void;
/**
 * Express middleware that propagates the authenticated user's `tenantId` into
 * the AsyncLocalStorage context used by the Mongoose tenant-isolation plugin.
 *
 * **Placement**: Chained automatically by `requireJwtAuth` after successful
 * passport authentication (req.user is populated). Must NOT be registered at
 * global `app.use()` scope — `req.user` is undefined at that stage.
 *
 * Behaviour:
 * - Authenticated request with `tenantId` → wraps downstream in `tenantStorage.run({ tenantId })`
 * - Authenticated request **without** `tenantId`:
 *   - Strict mode (`TENANT_ISOLATION_STRICT=true`) → responds 403
 *   - Non-strict (default) → passes through without ALS context (backward compat)
 * - Unauthenticated request → no-op (calls `next()` directly)
 */
export declare function tenantContextMiddleware(req: ServerRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=tenant.d.ts.map