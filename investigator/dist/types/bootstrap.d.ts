import type { MongoClient } from 'mongodb';
import type { MCPClientRegistry } from './mcp';
import { MongoDBInvestigationStore } from './memory';
import type { DomainName } from './types';
export interface BootstrapConfig {
    /** Map of DomainName to SSE endpoint URL */
    sseEndpoints: Record<DomainName, string>;
    /** Optional timeout for each connection in milliseconds (default: 10000) */
    timeout?: number;
    /** Optional logger function (default: console.log) */
    logger?: (message: string) => void;
}
/**
 * Bootstraps the MCP Client Registry by connecting to the 6 predefined MCP SSE URLs.
 *
 * @example
 * ```typescript
 * import { bootstrapClients } from '@askargus/investigator';
 *
 * const clients = await bootstrapClients({
 *   sseEndpoints: {
 *     postgres: 'http://localhost:3001/sse',
 *     mysql: 'http://localhost:3002/sse',
 *     neo4j: 'http://localhost:3003/sse',
 *     elasticsearch: 'http://localhost:3004/sse',
 *     rabbitmq: 'http://localhost:3005/sse',
 *     observability: 'http://localhost:3006/sse',
 *   },
 * });
 * ```
 *
 * NOTE: This is strictly scoped to the 6 MCPs used in `bulkmcp/dev-test`:
 * postgres, mysql, neo4j, elasticsearch, rabbitmq, observability.
 */
export declare function bootstrapClients(config: BootstrapConfig): Promise<MCPClientRegistry>;
/**
 * Creates a partial MCP client registry for specific domains only.
 * Useful when you only need a subset of the 6 domains.
 *
 * @example
 * ```typescript
 * import { bootstrapPartialClients } from '@askargus/investigator';
 *
 * // Only connect to postgres and observability
 * const clients = await bootstrapPartialClients({
 *   sseEndpoints: {
 *     postgres: 'http://localhost:3001/sse',
 *     observability: 'http://localhost:3006/sse',
 *   },
 * });
 * ```
 */
export declare function bootstrapPartialClients(config: Omit<BootstrapConfig, 'sseEndpoints'> & {
    sseEndpoints: Partial<Record<DomainName, string>>;
}): Promise<Partial<MCPClientRegistry>>;
/**
 * Creates and initializes a MongoDBInvestigationStore for long-term agent memory.
 *
 * Connects to MongoDB, creates the required indexes (text search, TTL, namespace),
 * and returns a store ready to be passed to buildInvestigator().
 *
 * @example
 * ```typescript
 * import { bootstrapMemoryStore } from '@askargus/investigator';
 * import { MongoClient } from 'mongodb';
 *
 * const mongo = new MongoClient(process.env.MONGO_URI!);
 * await mongo.connect();
 *
 * const store = await bootstrapMemoryStore(mongo);
 *
 * const graph = buildInvestigator({ model, clients, store });
 * ```
 */
export declare function bootstrapMemoryStore(client: MongoClient, options?: {
    dbName?: string;
    collectionName?: string;
}): Promise<MongoDBInvestigationStore>;
