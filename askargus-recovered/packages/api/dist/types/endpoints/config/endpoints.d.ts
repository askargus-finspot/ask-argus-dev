import type { AppConfig } from '@askargus/data-schemas';
import type { AgentCapabilities, TEndpointsConfig, TConfig } from 'askargus-data-provider';
import type { ServerRequest, TCustomEndpointsConfig } from '~/types';
type PartialEndpointEntry = Partial<TConfig>;
type DefaultEndpointsResult = Record<string, PartialEndpointEntry | false | null>;
export interface EndpointsConfigDeps {
    getAppConfig: (params: {
        role?: string | null;
        tenantId?: string;
    }) => Promise<AppConfig>;
    loadDefaultEndpointsConfig: (appConfig: AppConfig) => Promise<DefaultEndpointsResult>;
    loadCustomEndpointsConfig?: (custom: unknown) => TCustomEndpointsConfig | undefined;
}
export declare function createEndpointsConfigService(deps: EndpointsConfigDeps): {
    getEndpointsConfig: (req: ServerRequest) => Promise<TEndpointsConfig>;
    checkCapability: (req: ServerRequest, capability: AgentCapabilities) => Promise<boolean>;
};
export {};
//# sourceMappingURL=endpoints.d.ts.map