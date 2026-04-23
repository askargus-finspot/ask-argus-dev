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
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types, ClientSession, DeleteResult } from 'mongoose';
import { IAclEntry } from '@askargus/data-schemas';
import { AccessRoleIds, PrincipalType, ResourceType } from 'askargus-data-provider';
export declare class AccessControlService {
    private _dbMethods;
    private _aclModel;
    constructor(mongoose: typeof import('mongoose'));
    /**
     * Grant a permission to a principal for a resource using a role
     * @param {Object} params - Parameters for granting role-based permission
     * @param {string} params.principalType - PrincipalType.USER, PrincipalType.GROUP, or PrincipalType.PUBLIC
     * @param {string|mongoose.Types.ObjectId|null} params.principalId - The ID of the principal (null for PrincipalType.PUBLIC)
     * @param {string} params.resourceType - Type of resource (e.g., 'agent')
     * @param {string|mongoose.Types.ObjectId} params.resourceId - The ID of the resource
     * @param {string} params.accessRoleId - The ID of the role (e.g., AccessRoleIds.AGENT_VIEWER, AccessRoleIds.AGENT_EDITOR)
     * @param {Types.ObjectId} params.grantedBy - User ID granting the permission
     * @param {ClientSession} [params.session] - Optional MongoDB session for transactions
     * @returns {Promise<IAclEntry>} The created or updated ACL entry
     */
    grantPermission(args: {
        principalType: PrincipalType;
        principalId: string | Types.ObjectId | null;
        resourceType: string;
        resourceId: string | Types.ObjectId;
        accessRoleId: AccessRoleIds;
        grantedBy: string | Types.ObjectId;
        session?: ClientSession;
        roleId?: string | Types.ObjectId;
    }): Promise<IAclEntry | null>;
    /**
     * Find all resources of a specific type that a user has access to with specific permission bits
     * @param {Object} params - Parameters for finding accessible resources
     * @param {string | Types.ObjectId} params.userId - The ID of the user
     * @param {string} [params.role] - Optional user role (if not provided, will query from DB)
     * @param {string} params.resourceType - Type of resource (e.g., 'agent')
     * @param {number} params.requiredPermissions - The minimum permission bits required (e.g., 1 for VIEW, 3 for VIEW+EDIT)
     * @returns {Promise<Array>} Array of resource IDs
     */
    findAccessibleResources({ userId, role, resourceType, requiredPermissions, }: {
        userId: string | Types.ObjectId;
        role?: string;
        resourceType: string;
        requiredPermissions: number;
    }): Promise<Types.ObjectId[]>;
    /**
     * Find all publicly accessible resources of a specific type
     * @param {Object} params - Parameters for finding publicly accessible resources
     * @param {ResourceType} params.resourceType - Type of resource (e.g., 'agent')
     * @param {number} params.requiredPermissions - The minimum permission bits required (e.g., 1 for VIEW, 3 for VIEW+EDIT)
     * @returns {Promise<Types.ObjectId[]>} Array of resource IDs
     */
    findPubliclyAccessibleResources({ resourceType, requiredPermissions, }: {
        resourceType: ResourceType;
        requiredPermissions: number;
    }): Promise<Types.ObjectId[]>;
    /**
     * Get effective permissions for multiple resources in a batch operation
     * Returns map of resourceId → effectivePermissionBits
     *
     * @param {Object} params - Parameters
     * @param {string|mongoose.Types.ObjectId} params.userId - User ID
     * @param {string} [params.role] - User role (for group membership)
     * @param {string} params.resourceType - Resource type (must be valid ResourceType)
     * @param {Array<mongoose.Types.ObjectId>} params.resourceIds - Array of resource IDs
     * @returns {Promise<Map<string, number>>} Map of resourceId string → permission bits
     * @throws {Error} If resourceType is invalid
     */
    getResourcePermissionsMap({ userId, role, resourceType, resourceIds, }: {
        userId: string | Types.ObjectId;
        role: string;
        resourceType: ResourceType;
        resourceIds: (string | Types.ObjectId)[];
    }): Promise<Map<string, number>>;
    /**
     * Remove all permissions for a resource (cleanup when resource is deleted)
     * @param {Object} params - Parameters for removing all permissions
     * @param {string} params.resourceType - Type of resource (e.g., 'agent', 'prompt')
     * @param {string|mongoose.Types.ObjectId} params.resourceId - The ID of the resource
     * @returns {Promise<DeleteResult>} Result of the deletion operation
     */
    removeAllPermissions({ resourceType, resourceId, }: {
        resourceType: ResourceType;
        resourceId: string | Types.ObjectId;
    }): Promise<DeleteResult>;
    /**
     * Check if a user has specific permission bits on a resource
     * @param {Object} params - Parameters for checking permissions
     * @param {string|mongoose.Types.ObjectId} params.userId - The ID of the user
     * @param {string} [params.role] - Optional user role (if not provided, will query from DB)
     * @param {string} params.resourceType - Type of resource (e.g., 'agent')
     * @param {string|mongoose.Types.ObjectId} params.resourceId - The ID of the resource
     * @param {number} params.requiredPermissions - The permission bits required (e.g., 1 for VIEW, 3 for VIEW+EDIT)
     * @returns {Promise<boolean>} Whether the user has the required permission bits
     */
    checkPermission({ userId, role, resourceType, resourceId, requiredPermission, }: {
        userId: string;
        role?: string;
        resourceType: ResourceType;
        resourceId: string | Types.ObjectId;
        requiredPermission: number;
    }): Promise<boolean>;
    /**
     * Validates that the resourceType is one of the supported enum values
     * @param {string} resourceType - The resource type to validate
     * @throws {Error} If resourceType is not valid
     */
    private validateResourceType;
}
//# sourceMappingURL=accessControlService.d.ts.map