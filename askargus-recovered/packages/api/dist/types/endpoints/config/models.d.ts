import type { TModelsConfig } from 'askargus-data-provider';
import type { AppConfig } from '@askargus/data-schemas';
import type { ServerRequest, GetUserKeyValuesFunction } from '~/types';
import type { FetchModelsParams } from '~/endpoints/models';
export interface LoadConfigModelsDeps {
    getAppConfig: (params: {
        role?: string | null;
        tenantId?: string;
    }) => Promise<AppConfig>;
    getUserKeyValues: GetUserKeyValuesFunction;
    fetchModels?: (params: FetchModelsParams) => Promise<string[]>;
}
export declare function createLoadConfigModels(deps: LoadConfigModelsDeps): (req: ServerRequest) => Promise<TModelsConfig>;
//# sourceMappingURL=models.d.ts.map