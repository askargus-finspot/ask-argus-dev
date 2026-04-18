import type { Client as MCPClient } from '@modelcontextprotocol/sdk/client/index.js';
import type { DomainName, QueryPlan, QueryResult } from './types';
export type MCPClientRegistry = Record<DomainName, MCPClient>;
export declare function executePlan(clients: MCPClientRegistry, plan: QueryPlan): Promise<QueryResult>;
