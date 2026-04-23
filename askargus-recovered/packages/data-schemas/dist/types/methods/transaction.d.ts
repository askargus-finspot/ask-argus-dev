/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { FilterQuery, Types } from 'mongoose';
import type { IBalance, IBalanceUpdate, TransactionData } from '~/types';
import type { ITransaction } from '~/schema/transaction';
type MultiplierParams = {
    model?: string;
    valueKey?: string;
    tokenType?: 'prompt' | 'completion';
    inputTokenCount?: number;
    endpointTokenConfig?: Record<string, Record<string, number>>;
};
type CacheMultiplierParams = {
    cacheType?: 'write' | 'read';
    model?: string;
    endpointTokenConfig?: Record<string, Record<string, number>>;
};
/** Input data for creating a transaction */
export interface TxData {
    user: string | Types.ObjectId;
    conversationId?: string;
    model?: string;
    context?: string;
    tokenType?: 'prompt' | 'completion' | 'credits';
    rawAmount?: number;
    valueKey?: string;
    endpointTokenConfig?: Record<string, Record<string, number>> | null;
    inputTokenCount?: number;
    inputTokens?: number;
    writeTokens?: number;
    readTokens?: number;
    balance?: {
        enabled?: boolean;
    };
    transactions?: {
        enabled?: boolean;
    };
}
/** Return value from a successful transaction that also updates the balance */
export interface TransactionResult {
    rate: number;
    user: string;
    balance: number;
    prompt?: number;
    completion?: number;
    credits?: number;
}
export declare function createTransactionMethods(mongoose: typeof import('mongoose'), txMethods: {
    getMultiplier: (params: MultiplierParams) => number;
    getCacheMultiplier: (params: CacheMultiplierParams) => number | null;
}): {
    updateBalance: ({ user, incrementValue, setValues, }: {
        user: string;
        incrementValue: number;
        setValues?: IBalanceUpdate | undefined;
    }) => Promise<IBalance>;
    bulkInsertTransactions: (docs: TransactionData[]) => Promise<void>;
    findBalanceByUser: (user: string) => Promise<IBalance | null>;
    upsertBalanceFields: (user: string, fields: IBalanceUpdate) => Promise<IBalance | null>;
    getTransactions: (filter: FilterQuery<ITransaction>) => Promise<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteTransactions: (filter: FilterQuery<ITransaction>) => Promise<import("mongodb").DeleteResult>;
    deleteBalances: (filter: FilterQuery<IBalance>) => Promise<import("mongodb").DeleteResult>;
    createTransaction: (_txData: TxData) => Promise<TransactionResult | undefined>;
    createAutoRefillTransaction: (txData: TxData) => Promise<{
        rate: number;
        user: string;
        balance: number;
        transaction: any;
    } | undefined>;
    createStructuredTransaction: (_txData: TxData) => Promise<TransactionResult | undefined>;
};
export type TransactionMethods = ReturnType<typeof createTransactionMethods>;
export {};
