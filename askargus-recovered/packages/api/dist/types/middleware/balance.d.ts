import type { IBalanceUpdate, AppConfig, IBalance } from '@askargus/data-schemas';
import type { NextFunction, Request as ServerRequest, Response as ServerResponse } from 'express';
export interface BalanceMiddlewareOptions {
    getAppConfig: (options?: {
        role?: string;
        tenantId?: string;
        refresh?: boolean;
    }) => Promise<AppConfig>;
    findBalanceByUser: (userId: string) => Promise<IBalance | null>;
    upsertBalanceFields: (userId: string, fields: IBalanceUpdate) => Promise<IBalance | null>;
}
/**
 * Factory function to create middleware that synchronizes user balance settings with current balance configuration.
 * @param options - Options containing getBalanceConfig function and Balance model
 * @returns Express middleware function
 */
export declare function createSetBalanceConfig({ getAppConfig, findBalanceByUser, upsertBalanceFields, }: BalanceMiddlewareOptions): (req: ServerRequest, res: ServerResponse, next: NextFunction) => Promise<void>;
//# sourceMappingURL=balance.d.ts.map