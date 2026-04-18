import type { MCPClientRegistry } from './mcp';
import type { QueryPlan, QueryResult } from './types';
/**
 * Executes a query plan with exponential-backoff retries on transient MCP failures.
 * Permanent failures ("No MCP client registered") are not retried.
 */
export declare function executePlanWithRetry(clients: MCPClientRegistry, plan: QueryPlan, maxRetries?: number): Promise<QueryResult>;
