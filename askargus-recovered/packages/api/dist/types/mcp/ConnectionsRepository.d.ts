import type * as t from './types';
import { MCPConnection } from './connection';
/**
 * Manages MCP connections with lazy loading and reconnection.
 * Maintains a pool of connections and handles connection lifecycle management.
 * Queries server configurations dynamically from the MCPServersRegistry (single source of truth).
 *
 * Scope-aware: Each repository is tied to a specific owner scope:
 * - ownerId = undefined → manages app-level servers only
 * - ownerId = userId → manages user-level and private servers for that user
 */
export declare class ConnectionsRepository {
    protected connections: Map<string, MCPConnection>;
    protected oauthOpts: t.OAuthConnectionOptions | undefined;
    private readonly ownerId;
    constructor(ownerId?: string, oauthOpts?: t.OAuthConnectionOptions);
    /** Returns the number of active connections in this repository */
    getConnectionCount(): number;
    /** Checks whether this repository can connect to a specific server */
    has(serverName: string): Promise<boolean>;
    /** Gets or creates a connection for the specified server with lazy loading */
    get(serverName: string): Promise<MCPConnection | null>;
    /** Gets or creates connections for multiple servers concurrently */
    getMany(serverNames: string[]): Promise<Map<string, MCPConnection>>;
    /** Returns all currently loaded connections without creating new ones */
    getLoaded(): Promise<Map<string, MCPConnection>>;
    /** Gets or creates connections for all configured servers in this repository's scope */
    getAll(): Promise<Map<string, MCPConnection>>;
    /** Disconnects and removes a specific server connection from the pool */
    disconnect(serverName: string): Promise<void>;
    /** Disconnects all active connections and returns array of disconnect promises */
    disconnectAll(): Promise<void>[];
    protected prefix(serverName: string): string;
    /**
     * App-level (shared) connections cannot serve servers that need per-user context:
     * env/header placeholders like `{{MY_KEY}}` are only resolved by `processMCPEnv()`
     * when real `customUserVars` values exist — which requires a user-level connection.
     */
    private isAllowedToConnectToServer;
}
//# sourceMappingURL=ConnectionsRepository.d.ts.map