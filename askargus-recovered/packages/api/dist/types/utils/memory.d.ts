import { GenerationJobManager } from '~/stream';
import { OAuthReconnectionManager } from '~/mcp/oauth/OAuthReconnectionManager';
import { MCPManager } from '~/mcp/MCPManager';
type ConnectionStats = ReturnType<InstanceType<typeof MCPManager>['getConnectionStats']>;
type TrackerStats = ReturnType<InstanceType<typeof OAuthReconnectionManager>['getTrackerStats']>;
type RuntimeStats = ReturnType<(typeof GenerationJobManager)['getRuntimeStats']>;
interface MemorySnapshot {
    ts: number;
    rss: number;
    heapUsed: number;
    heapTotal: number;
    external: number;
    arrayBuffers: number;
    mcpConnections: ConnectionStats | null;
    oauthTracker: TrackerStats | null;
    generationJobs: RuntimeStats | null;
}
declare function collectSnapshot(): void;
declare function forceGC(): boolean;
declare function getSnapshots(): readonly MemorySnapshot[];
declare function start(): void;
declare function stop(): void;
export declare const memoryDiagnostics: {
    start: typeof start;
    stop: typeof stop;
    forceGC: typeof forceGC;
    getSnapshots: typeof getSnapshots;
    collectSnapshot: typeof collectSnapshot;
};
export {};
//# sourceMappingURL=memory.d.ts.map