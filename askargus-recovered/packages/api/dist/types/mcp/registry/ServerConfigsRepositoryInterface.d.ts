import { ParsedServerConfig, AddServerResult } from '~/mcp/types';
/**
 * Interface for future DB implementation
 */
export interface IServerConfigsRepositoryInterface {
    add(serverName: string, config: ParsedServerConfig, userId?: string): Promise<AddServerResult>;
    update(serverName: string, config: ParsedServerConfig, userId?: string): Promise<void>;
    /** Atomic add-or-update without requiring callers to inspect error messages. */
    upsert(serverName: string, config: ParsedServerConfig, userId?: string): Promise<void>;
    remove(serverName: string, userId?: string): Promise<void>;
    get(serverName: string, userId?: string): Promise<ParsedServerConfig | undefined>;
    getAll(userId?: string): Promise<Record<string, ParsedServerConfig>>;
    reset(): Promise<void>;
}
//# sourceMappingURL=ServerConfigsRepositoryInterface.d.ts.map