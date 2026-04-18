import { executePlan } from './mcp';
import type { MCPClientRegistry } from './mcp';
import type { QueryPlan, QueryResult } from './types';

const BASE_DELAY_MS = 500;

/**
 * Executes a query plan with exponential-backoff retries on transient MCP failures.
 * Permanent failures ("No MCP client registered") are not retried.
 */
export async function executePlanWithRetry(
  clients: MCPClientRegistry,
  plan: QueryPlan,
  maxRetries = 2,
): Promise<QueryResult> {
  let lastResult: QueryResult | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, BASE_DELAY_MS * Math.pow(2, attempt - 1)),
      );
    }

    const result = await executePlan(clients, plan);
    if (result.ok) return result;

    lastResult = result;

    // No client registered — permanent failure, don't retry
    if (result.error?.includes('No MCP client registered')) break;
  }

  return lastResult!;
}
