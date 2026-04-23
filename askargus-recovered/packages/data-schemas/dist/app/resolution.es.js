import { INTERFACE_PERMISSION_FIELDS, PERMISSION_SUB_KEYS } from 'askargus-data-provider';

const MAX_MERGE_DEPTH = 10;
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
/**
 * Maps YAML-level override keys (TCustomConfig) to their AppConfig equivalents.
 * Overrides are stored with YAML keys but merged into the already-processed AppConfig
 * where some fields have been renamed by AppService.
 *
 * When AppService renames a field, add the mapping here. Map entries are
 * type-checked: keys must be valid TCustomConfig fields, values must be
 * valid AppConfig fields. The runtime lookup casts string keys to satisfy
 * strict indexing — unknown keys safely fall through via the ?? fallback.
 */
const OVERRIDE_KEY_MAP = {
    mcpServers: 'mcpConfig',
    interface: 'interfaceConfig',
    turnstile: 'turnstileConfig',
};
function deepMerge(target, source, depth = 0) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        if (UNSAFE_KEYS.has(key)) {
            continue;
        }
        const sourceVal = source[key];
        const targetVal = result[key];
        if (depth < MAX_MERGE_DEPTH &&
            sourceVal != null &&
            typeof sourceVal === 'object' &&
            !Array.isArray(sourceVal) &&
            targetVal != null &&
            typeof targetVal === 'object' &&
            !Array.isArray(targetVal)) {
            result[key] = deepMerge(targetVal, sourceVal, depth + 1);
        }
        else {
            result[key] = sourceVal;
        }
    }
    return result;
}
/**
 * Merge DB config overrides into a base AppConfig.
 *
 * Configs are sorted by priority ascending (lowest first, highest wins).
 * Each config's `overrides` is deep-merged into the base config in order.
 */
function mergeConfigOverrides(baseConfig, configs) {
    var _a;
    if (!configs || configs.length === 0) {
        return baseConfig;
    }
    const sorted = [...configs].sort((a, b) => a.priority - b.priority);
    let merged = { ...baseConfig };
    for (const config of sorted) {
        if (config.overrides && typeof config.overrides === 'object') {
            const remapped = {};
            for (const [key, value] of Object.entries(config.overrides)) {
                const mappedKey = (_a = OVERRIDE_KEY_MAP[key]) !== null && _a !== void 0 ? _a : key;
                if (key === 'interface' &&
                    value != null &&
                    typeof value === 'object' &&
                    !Array.isArray(value)) {
                    const filtered = {};
                    for (const [field, fieldVal] of Object.entries(value)) {
                        if (!INTERFACE_PERMISSION_FIELDS.has(field)) {
                            filtered[field] = fieldVal;
                        }
                        else if (fieldVal != null &&
                            typeof fieldVal === 'object' &&
                            !Array.isArray(fieldVal)) {
                            // Composite permission field (e.g. mcpServers): strip permission
                            // sub-keys but preserve UI-only sub-keys like placeholder/trustCheckbox.
                            const uiOnly = {};
                            for (const [sub, subVal] of Object.entries(fieldVal)) {
                                if (!PERMISSION_SUB_KEYS.has(sub)) {
                                    uiOnly[sub] = subVal;
                                }
                            }
                            if (Object.keys(uiOnly).length > 0) {
                                filtered[field] = uiOnly;
                            }
                        }
                        // boolean permission fields (e.g. runCode: false) are fully stripped
                    }
                    if (Object.keys(filtered).length > 0) {
                        remapped[mappedKey] = filtered;
                    }
                }
                else {
                    remapped[mappedKey] = value;
                }
            }
            merged = deepMerge(merged, remapped);
        }
    }
    return merged;
}

export { mergeConfigOverrides };
//# sourceMappingURL=resolution.es.js.map
