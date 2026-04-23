'use strict';

var mongoose = require('mongoose');
var askargusDataProvider = require('askargus-data-provider');

/**
 * Uses a sub-schema for permissions. Notice we disable `_id` for this subdocument.
 */
const rolePermissionsSchema = new mongoose.Schema({
    [askargusDataProvider.PermissionTypes.BOOKMARKS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.PROMPTS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
        [askargusDataProvider.Permissions.CREATE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE_PUBLIC]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.MEMORIES]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
        [askargusDataProvider.Permissions.CREATE]: { type: Boolean },
        [askargusDataProvider.Permissions.UPDATE]: { type: Boolean },
        [askargusDataProvider.Permissions.READ]: { type: Boolean },
        [askargusDataProvider.Permissions.OPT_OUT]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.AGENTS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
        [askargusDataProvider.Permissions.CREATE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE_PUBLIC]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.MULTI_CONVO]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.TEMPORARY_CHAT]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.RUN_CODE]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.WEB_SEARCH]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.PEOPLE_PICKER]: {
        [askargusDataProvider.Permissions.VIEW_USERS]: { type: Boolean },
        [askargusDataProvider.Permissions.VIEW_GROUPS]: { type: Boolean },
        [askargusDataProvider.Permissions.VIEW_ROLES]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.MARKETPLACE]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.FILE_SEARCH]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.FILE_CITATIONS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.MCP_SERVERS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
        [askargusDataProvider.Permissions.CREATE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE_PUBLIC]: { type: Boolean },
    },
    [askargusDataProvider.PermissionTypes.REMOTE_AGENTS]: {
        [askargusDataProvider.Permissions.USE]: { type: Boolean },
        [askargusDataProvider.Permissions.CREATE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE]: { type: Boolean },
        [askargusDataProvider.Permissions.SHARE_PUBLIC]: { type: Boolean },
    },
}, { _id: false });
const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, default: '' },
    permissions: {
        type: rolePermissionsSchema,
    },
    tenantId: {
        type: String,
        index: true,
    },
});
roleSchema.index({ name: 1, tenantId: 1 }, { unique: true });

module.exports = roleSchema;
//# sourceMappingURL=role.cjs.map
