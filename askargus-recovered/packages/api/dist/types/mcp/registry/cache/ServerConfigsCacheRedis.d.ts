import type Keyv from 'keyv';
import type { IServerConfigsRepositoryInterface } from '~/mcp/registry/ServerConfigsRepositoryInterface';
import type { ParsedServerConfig, AddServerResult } from '~/mcp/types';
import { BaseRegistryCache } from './BaseRegistryCache';
export declare class ServerConfigsCacheRedis extends BaseRegistryCache implements IServerConfigsRepositoryInterface {
    protected readonly cache: Keyv;
    private readonly namespace;
    constructor(namespace: string, leaderOnly: boolean);
    add(serverName: string, config: ParsedServerConfig): Promise<AddServerResult>;
    update(serverName: string, config: ParsedServerConfig): Promise<void>;
    upsert(serverName: string, config: ParsedServerConfig): Promise<void>;
    remove(serverName: string): Promise<void>;
    get(serverName: string): Promise<ParsedServerConfig | undefined>;
    getAll(): Promise<Record<string, ParsedServerConfig>>;
}
//# sourceMappingURL=ServerConfigsCacheRedis.d.ts.map