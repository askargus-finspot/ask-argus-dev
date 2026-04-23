import type { TCustomConfig, TTransactionsConfig } from 'askargus-data-provider';
import type { StructuredTokenUsage, BulkWriteDeps, TxMetadata, TokenUsage, PricingFns } from './transactions';
import type { UsageMetadata } from '~/stream/interfaces/IJobStore';
import type { EndpointTokenConfig } from '~/types/tokens';
type SpendTokensFn = (txData: TxMetadata, tokenUsage: TokenUsage) => Promise<unknown>;
type SpendStructuredTokensFn = (txData: TxMetadata, tokenUsage: StructuredTokenUsage) => Promise<unknown>;
export interface RecordUsageDeps {
    spendTokens: SpendTokensFn;
    spendStructuredTokens: SpendStructuredTokensFn;
    pricing?: PricingFns;
    bulkWriteOps?: BulkWriteDeps;
}
export interface RecordUsageParams {
    user: string;
    conversationId: string;
    collectedUsage: UsageMetadata[];
    model?: string;
    context?: string;
    messageId?: string;
    balance?: Partial<TCustomConfig['balance']> | null;
    transactions?: Partial<TTransactionsConfig>;
    endpointTokenConfig?: EndpointTokenConfig;
}
export interface RecordUsageResult {
    input_tokens: number;
    output_tokens: number;
}
/**
 * Records token usage for collected LLM calls and spends tokens against balance.
 * This handles both sequential execution (tool calls) and parallel execution (multiple agents).
 *
 * When `pricing` and `bulkWriteOps` deps are provided, prepares all transaction documents
 * in-memory first, then writes them in a single `insertMany` + one `updateBalance` call.
 */
export declare function recordCollectedUsage(deps: RecordUsageDeps, params: RecordUsageParams): Promise<RecordUsageResult | undefined>;
export {};
//# sourceMappingURL=usage.d.ts.map