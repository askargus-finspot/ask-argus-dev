import type { JsonSchemaType } from '@askargus/agents';
import type { LCAvailableTools } from './types';
export interface MCPToolInput {
    name: string;
    description?: string;
    inputSchema?: JsonSchemaType;
}
export interface MCPToolCacheDeps {
    getCachedTools: (options?: {
        userId?: string;
        serverName?: string;
    }) => Promise<LCAvailableTools | null>;
    setCachedTools: (tools: LCAvailableTools, options?: {
        userId?: string;
        serverName?: string;
    }) => Promise<boolean>;
}
export declare function createMCPToolCacheService(deps: MCPToolCacheDeps): {
    updateMCPServerTools: (params: {
        userId: string;
        serverName: string;
        tools: MCPToolInput[] | null;
    }) => Promise<LCAvailableTools>;
    mergeAppTools: (appTools: LCAvailableTools) => Promise<void>;
    cacheMCPServerTools: (params: {
        userId: string;
        serverName: string;
        serverTools: LCAvailableTools;
    }) => Promise<void>;
};
//# sourceMappingURL=tools.d.ts.map