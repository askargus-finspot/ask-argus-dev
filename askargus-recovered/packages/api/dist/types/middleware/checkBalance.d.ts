import type { BalanceConfig, IBalanceUpdate } from '@askargus/data-schemas';
import type { Response } from 'express';
import type { ServerRequest } from '~/types/http';
type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
interface BalanceRecord {
    tokenCredits: number;
    autoRefillEnabled?: boolean;
    refillAmount?: number;
    lastRefill?: Date;
    refillIntervalValue?: number;
    refillIntervalUnit?: TimeUnit;
}
interface TxData {
    user: string;
    model?: string;
    endpoint?: string;
    valueKey?: string;
    tokenType?: string;
    amount: number;
    endpointTokenConfig?: unknown;
    generations?: unknown[];
}
export interface CheckBalanceDeps {
    findBalanceByUser: (user: string) => Promise<BalanceRecord | null>;
    getMultiplier: (params: Record<string, unknown>) => number;
    createAutoRefillTransaction: (data: Record<string, unknown>) => Promise<{
        balance: number;
    } | undefined>;
    logViolation: (req: unknown, res: unknown, type: string, errorMessage: Record<string, unknown>, score: number) => Promise<void>;
    /** Balance config for lazy initialization when no record exists */
    balanceConfig?: BalanceConfig;
    /** Upsert function for lazy initialization when no record exists */
    upsertBalanceFields?: (userId: string, fields: IBalanceUpdate) => Promise<BalanceRecord | null>;
}
/**
 * Checks balance for a user and logs a violation if they cannot spend.
 * Throws an error with the balance info if insufficient funds.
 */
export declare function checkBalance({ req, res, txData }: {
    req: ServerRequest;
    res: Response;
    txData: TxData;
}, deps: CheckBalanceDeps): Promise<boolean>;
export {};
//# sourceMappingURL=checkBalance.d.ts.map