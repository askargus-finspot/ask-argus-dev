import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import type { MongoClient } from 'mongodb';
import type { MCPClientRegistry } from './mcp';
import { MongoDBInvestigationStore } from './memory';
import { DOMAINS } from './domains';
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
export async function bootstrapClients(config: BootstrapConfig): Promise<MCPClientRegistry> {
  const { sseEndpoints, timeout = 10000, logger = console.log } = config;
  const clients: Partial<MCPClientRegistry> = {};

  const initPromises = Object.entries(DOMAINS).map(async ([domainKey]) => {
    const domain = domainKey as DomainName;
    const url = sseEndpoints[domain];
    
    if (!url) {
      throw new Error(`[Investigator] Missing SSE endpoint URL for domain: ${domain}`);
    }

    const transport = new SSEClientTransport(new URL(url));
    const client = new Client(
      { name: `@askargus/investigator-${domain}`, version: '0.2.0' },
      { capabilities: {} }
    );

    // Connect with timeout
    const connectPromise = client.connect(transport);
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(`Connection timeout for ${domain}`)), timeout)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    clients[domain] = client;
    logger(`[Investigator] Successfully bootstrapped MCP client for domain: ${domain}`);
  });

  await Promise.all(initPromises);
  
  // Verify all 6 clients are registered
  return clients as MCPClientRegistry;
}

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
export async function bootstrapPartialClients(
  config: Omit<BootstrapConfig, 'sseEndpoints'> & { sseEndpoints: Partial<Record<DomainName, string>> }
): Promise<Partial<MCPClientRegistry>> {
  const { sseEndpoints, timeout = 10000, logger = console.log } = config;
  const clients: Partial<MCPClientRegistry> = {};

  const entries = Object.entries(sseEndpoints) as [DomainName, string][];
  
  const initPromises = entries.map(async ([domain, url]) => {
    if (!url) return;
    
    const transport = new SSEClientTransport(new URL(url));
    const client = new Client(
      { name: `@askargus/investigator-${domain}`, version: '0.2.0' },
      { capabilities: {} }
    );

    const connectPromise = client.connect(transport);
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(`Connection timeout for ${domain}`)), timeout)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    clients[domain] = client;
    logger(`[Investigator] Successfully bootstrapped MCP client for domain: ${domain}`);
  });

  await Promise.all(initPromises);

  return clients;
}

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
export async function bootstrapMemoryStore(
  client: MongoClient,
  options?: { dbName?: string; collectionName?: string },
): Promise<MongoDBInvestigationStore> {
  const store = new MongoDBInvestigationStore(
    client,
    options?.dbName ?? 'investigator',
    options?.collectionName ?? 'memory',
  );
  await store.start();
  return store;
}
