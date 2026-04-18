import type { DomainName, QueryLanguage } from './types';
export type CostModel = 'cardinality' | 'rows' | 'none';
export interface DomainConfig {
    name: DomainName;
    language: QueryLanguage;
    mcpServerId: string;
    description: string;
    requiresTimeRange: boolean;
    costModel: CostModel;
}
export declare const DOMAINS: Record<DomainName, DomainConfig>;
export declare const DOMAIN_NAMES: readonly DomainName[];
