import type { TAgentsEndpoint } from 'askargus-data-provider';
/**
 * Resolves the effective recursion limit for an agent run via a 3-step cascade:
 * 1. YAML endpoint config default (falls back to 50)
 * 2. Per-agent DB override (if set and positive)
 * 3. Global max cap from YAML (if set and positive)
 */
export declare function resolveRecursionLimit(agentsEConfig: TAgentsEndpoint | undefined, agent: {
    recursion_limit?: number;
} | undefined): number;
//# sourceMappingURL=config.d.ts.map