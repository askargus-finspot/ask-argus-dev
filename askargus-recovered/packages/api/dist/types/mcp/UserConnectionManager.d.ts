import type * as t from './types';
import { ConnectionsRepository } from '~/mcp/ConnectionsRepository';
import { MCPConnection } from './connection';
/**
 * Abstract base class for managing user-specific MCP connections with lifecycle management.
 * Only meant to be extended by MCPManager.
 * Much of the logic was move here from the old MCPManager to make it more manageable.
 * User connections will soon be ephemeral and not cached anymore:
 * https://github.com/danny-avila/AskArgus/discussions/8790
 */
export declare abstract class UserConnectionManager {
    appConnections: ConnectionsRepository | null;
    protected userConnections: Map<string, Map<string, MCPConnection>>;
    /** Last activity timestamp for users (not per server) */
    protected userLastActivity: Map<string, number>;
    /** In-flight connection promises keyed by `userId:serverName` — coalesces concurrent attempts */
    protected pendingConnections: Map<string, Promise<MCPConnection>>;
    /** Updates the last activity timestamp for a user */
    protected updateUserLastActivity(userId: string): void;
    /** Gets or creates a connection for a specific user, coalescing concurrent attempts */
    getUserConnection(opts: {
        serverName: string;
        forceNew?: boolean;
        /** Pre-resolved config for config-source servers not in YAML/DB */
        serverConfig?: t.ParsedServerConfig;
    } & Omit<t.OAuthConnectionOptions, 'useOAuth'>): Promise<MCPConnection>;
    private createUserConnectionInternal;
    /** Returns all connections for a specific user */
    getUserConnections(userId: string): Map<string, MCPConnection> | undefined;
    /** Removes a specific user connection entry */
    protected removeUserConnection(userId: string, serverName: string): void;
    /** Disconnects and removes a specific user connection */
    disconnectUserConnection(userId: string, serverName: string): Promise<void>;
    /** Disconnects and removes all connections for a specific user */
    disconnectUserConnections(userId: string): Promise<void>;
    /** Check for and disconnect idle connections */
    protected checkIdleConnections(currentUserId?: string): void;
    /** Returns counts of tracked users and connections for diagnostics */
    getConnectionStats(): {
        trackedUsers: number;
        totalConnections: number;
        activityEntries: number;
        appConnectionCount: number;
    };
}
//# sourceMappingURL=UserConnectionManager.d.ts.map