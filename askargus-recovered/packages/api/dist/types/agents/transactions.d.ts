import type { TCustomConfig, TTransactionsConfig } from 'askargus-data-provider';
import type { TransactionData } from '@askargus/data-schemas';
import type { EndpointTokenConfig } from '~/types/tokens';
type TokenType = 'prompt' | 'completion';
interface GetMultiplierParams {
    valueKey?: string;
    tokenType?: TokenType;
    model?: string;
    endpointTokenConfig?: EndpointTokenConfig;
    inputTokenCount?: number;
}
interface GetCacheMultiplierParams {
    cacheType: 'write' | 'read';
    model?: string;
    endpointTokenConfig?: EndpointTokenConfig;
}
export interface PricingFns {
    getMultiplier: (params: GetMultiplierParams) => number;
    getCacheMultiplier: (params: GetCacheMultiplierParams) => number | null;
}
export interface PreparedEntry {
    doc: TransactionData;
    tokenValue: number;
    balance?: Partial<TCustomConfig['balance']> | null;
}
export interface TokenUsage {
    promptTokens?: number;
    completionTokens?: number;
}
export interface StructuredPromptTokens {
    input?: number;
    write?: number;
    read?: number;
}
export interface StructuredTokenUsage {
    promptTokens?: StructuredPromptTokens;
    completionTokens?: number;
}
export interface TxMetadata {
    user: string;
    model?: string;
    context: string;
    messageId?: string;
    conversationId: string;
    balance?: Partial<TCustomConfig['balance']> | null;
    transactions?: Partial<TTransactionsConfig>;
    endpointTokenConfig?: EndpointTokenConfig;
}
export interface BulkWriteDeps {
    insertMany: (docs: TransactionData[]) => Promise<unknown>;
    updateBalance: (params: {
        user: string;
        incrementValue: number;
    }) => Promise<unknown>;
}
export declare function prepareTokenSpend(txData: TxMetadata, tokenUsage: TokenUsage, pricing: PricingFns): PreparedEntry[];
export declare function prepareStructuredTokenSpend(txData: TxMetadata, tokenUsage: StructuredTokenUsage, pricing: PricingFns): PreparedEntry[];
export declare function bulkWriteTransactions({ user, docs }: {
    user: string;
    docs: PreparedEntry[];
}, dbOps: BulkWriteDeps): Promise<void>;
export {};
//# sourceMappingURL=transactions.d.ts.map