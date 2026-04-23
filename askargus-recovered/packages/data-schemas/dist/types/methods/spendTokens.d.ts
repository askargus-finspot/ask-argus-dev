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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { TxData, TransactionResult } from './transaction';
/** Base transaction context passed by callers — does not include fields added internally */
export interface SpendTxData {
    user: string | import('mongoose').Types.ObjectId;
    conversationId?: string;
    model?: string;
    context?: string;
    endpointTokenConfig?: Record<string, Record<string, number>> | null;
    balance?: {
        enabled?: boolean;
    };
    transactions?: {
        enabled?: boolean;
    };
    valueKey?: string;
}
export declare function createSpendTokensMethods(_mongoose: typeof import('mongoose'), transactionMethods: {
    createTransaction: (txData: TxData) => Promise<TransactionResult | undefined>;
    createStructuredTransaction: (txData: TxData) => Promise<TransactionResult | undefined>;
}): {
    spendTokens: (txData: SpendTxData, tokenUsage: {
        promptTokens?: number;
        completionTokens?: number;
    }) => Promise<void>;
    spendStructuredTokens: (txData: SpendTxData, tokenUsage: {
        promptTokens?: {
            input?: number;
            write?: number;
            read?: number;
        };
        completionTokens?: number;
    }) => Promise<{
        prompt: TransactionResult | undefined;
        completion: TransactionResult | undefined;
    }>;
};
export type SpendTokensMethods = ReturnType<typeof createSpendTokensMethods>;
