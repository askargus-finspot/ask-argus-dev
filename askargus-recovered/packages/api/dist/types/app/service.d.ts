/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { Types } from 'mongoose';
import type { AppConfig, IConfig } from '@askargus/data-schemas';
interface CacheStore {
    get: (key: string) => Promise<unknown>;
    set: (key: string, value: unknown, ttl?: number) => Promise<unknown>;
    delete: (key: string) => Promise<boolean>;
    /** Keyv options — used for key enumeration when clearing override caches. */
    opts?: {
        store?: {
            keys?: () => IterableIterator<string>;
        };
    };
}
export interface AppConfigServiceDeps {
    /** Load the base AppConfig from YAML + AppService processing. */
    loadBaseConfig: () => Promise<AppConfig | undefined>;
    /** Cache tools after base config is loaded. */
    setCachedTools: (tools: Record<string, unknown>) => Promise<void>;
    /** Get a cache store by key. */
    getCache: (key: string) => CacheStore;
    /** The CacheKeys constants from askargus-data-provider. */
    cacheKeys: {
        APP_CONFIG: string;
    };
    /** Fetch applicable DB config overrides for a set of principals. */
    getApplicableConfigs: (principals?: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>) => Promise<IConfig[]>;
    /** Resolve full principal list (user + role + groups) from userId/role. */
    getUserPrincipals: (params: {
        userId: string | Types.ObjectId;
        role?: string | null;
    }) => Promise<Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>>;
    /** TTL in ms for per-user/role merged config caches. Defaults to 60 000. */
    overrideCacheTtl?: number;
}
export declare function _resetOverrideStrictCache(): void;
export declare function createAppConfigService(deps: AppConfigServiceDeps): {
    getAppConfig: (options?: {
        role?: string;
        userId?: string;
        tenantId?: string;
        refresh?: boolean;
        /** When true, return only the YAML-derived base config — no DB override queries. */
        baseOnly?: boolean;
    }) => Promise<AppConfig>;
    clearAppConfigCache: () => Promise<void>;
    clearOverrideCache: (tenantId?: string) => Promise<void>;
};
export type AppConfigService = ReturnType<typeof createAppConfigService>;
export {};
//# sourceMappingURL=service.d.ts.map