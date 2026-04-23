import { PermissionTypes } from 'askargus-data-provider';
import type { IRole, AppConfig } from '@askargus/data-schemas';
export declare function updateInterfacePermissions({ appConfig, getRoleByName, updateAccessPermissions, tenantId, }: {
    appConfig: AppConfig;
    getRoleByName: (roleName: string, fieldsToSelect?: string | string[]) => Promise<IRole | null>;
    updateAccessPermissions: (roleName: string, permissionsUpdate: Partial<Record<PermissionTypes, Record<string, boolean | undefined>>>, roleData?: IRole | null) => Promise<void>;
    /**
     * Optional tenant ID for scoping role updates to a specific tenant.
     * When provided (and not SYSTEM_TENANT_ID), runs inside `tenantStorage.run({ tenantId })`.
     * When omitted or SYSTEM_TENANT_ID, uses the caller's existing ALS context.
     */
    tenantId?: string;
}): Promise<void>;
//# sourceMappingURL=permissions.d.ts.map