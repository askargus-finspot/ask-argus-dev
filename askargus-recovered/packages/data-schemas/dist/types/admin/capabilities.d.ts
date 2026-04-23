import { ResourceType } from 'askargus-data-provider';
import type { BaseSystemCapability, SystemCapability, ConfigSection, CapabilityCategory } from '~/types/admin';
/**
 * The canonical set of base system capabilities.
 *
 * These are used by the admin panel and AskArgus API to gate access to
 * admin features. Config-section-derived capabilities (e.g.
 * `manage:configs:endpoints`) are built on top of these where the
 * configSchema is available.
 */
export declare const SystemCapabilities: {
    readonly ACCESS_ADMIN: "access:admin";
    readonly READ_USERS: "read:users";
    readonly MANAGE_USERS: "manage:users";
    readonly READ_GROUPS: "read:groups";
    readonly MANAGE_GROUPS: "manage:groups";
    readonly READ_ROLES: "read:roles";
    readonly MANAGE_ROLES: "manage:roles";
    readonly READ_CONFIGS: "read:configs";
    readonly MANAGE_CONFIGS: "manage:configs";
    readonly ASSIGN_CONFIGS: "assign:configs";
    readonly READ_USAGE: "read:usage";
    readonly READ_AGENTS: "read:agents";
    readonly MANAGE_AGENTS: "manage:agents";
    readonly MANAGE_MCP_SERVERS: "manage:mcpservers";
    readonly READ_PROMPTS: "read:prompts";
    readonly MANAGE_PROMPTS: "manage:prompts";
    /** Reserved — not yet enforced by any middleware. */
    readonly READ_ASSISTANTS: "read:assistants";
    readonly MANAGE_ASSISTANTS: "manage:assistants";
};
/**
 * Capabilities that are implied by holding a broader capability.
 * e.g. `MANAGE_USERS` implies `READ_USERS`.
 */
export declare const CapabilityImplications: Partial<Record<BaseSystemCapability, BaseSystemCapability[]>>;
/**
 * Runtime validator for the full `SystemCapability` union:
 * base capabilities, section-level config capabilities, and config assignment capabilities.
 */
export declare function isValidCapability(value: string): boolean;
/**
 * Check whether a set of held capabilities satisfies a required capability,
 * accounting for the manage→read implication hierarchy.
 */
export declare function hasImpliedCapability(held: string[], required: string): boolean;
/**
 * Given a set of directly-held capabilities, compute the full set including
 * all implied capabilities.
 */
export declare function expandImplications(directCaps: string[]): string[];
/**
 * Maps each ACL ResourceType to the SystemCapability that grants
 * unrestricted management access. Typed as `Record<ResourceType, …>`
 * so adding a new ResourceType variant causes a compile error until a
 * capability is assigned here.
 */
export declare const ResourceCapabilityMap: Record<ResourceType, SystemCapability>;
/**
 * Derives a section-level config management capability from a configSchema key.
 * @example configCapability('endpoints') → 'manage:configs:endpoints'
 *
 * TODO: Section-level config capabilities are scaffolded but not yet active.
 * To activate delegated config management:
 *  1. Expose POST/DELETE /api/admin/grants endpoints (wiring grantCapability/revokeCapability)
 *  2. Seed section-specific grants for delegated admin roles via those endpoints
 *  3. Guard config write handlers with hasConfigCapability(user, section)
 */
export declare function configCapability(section: ConfigSection): `manage:configs:${ConfigSection}`;
/**
 * Derives a section-level config read capability from a configSchema key.
 * @example readConfigCapability('endpoints') → 'read:configs:endpoints'
 */
export declare function readConfigCapability(section: ConfigSection): `read:configs:${ConfigSection}`;
/** Reserved principalId for the DB base config (overrides YAML defaults). */
export declare const BASE_CONFIG_PRINCIPAL_ID = "__base__";
/** Pre-defined UI categories for grouping capabilities in the admin panel. */
export declare const CAPABILITY_CATEGORIES: CapabilityCategory[];
