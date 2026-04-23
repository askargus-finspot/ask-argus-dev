'use strict';

var winston = require('../config/winston.cjs');
var askargusDataProvider = require('askargus-data-provider');

/**
 * Sets up Model Specs from the config (`askargus.yaml`) file.
 * @param [endpoints] - The loaded custom configuration for endpoints.
 * @param [modelSpecs] - The loaded custom configuration for model specs.
 * @param [interfaceConfig] - The loaded interface configuration.
 * @returns The processed model specs, if any.
 */
function processModelSpecs(endpoints, _modelSpecs, interfaceConfig) {
    var _a, _b, _c, _d;
    if (!_modelSpecs) {
        return undefined;
    }
    const list = _modelSpecs.list;
    const modelSpecs = [];
    const customEndpoints = (_a = endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.custom]) !== null && _a !== void 0 ? _a : [];
    if ((interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.modelSelect) !== true && ((_c = (_b = _modelSpecs.addedEndpoints) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0) {
        winston.warn(`To utilize \`addedEndpoints\`, which allows provider/model selections alongside model specs, set \`modelSelect: true\` in the interface configuration.

      Example:
      \`\`\`yaml
      interface:
        modelSelect: true
      \`\`\`
      `);
    }
    if (!list || list.length === 0) {
        return undefined;
    }
    for (const spec of list) {
        const currentEndpoint = (_d = spec.preset) === null || _d === void 0 ? void 0 : _d.endpoint;
        if (!currentEndpoint) {
            winston.warn('A model spec is missing the `endpoint` field within its `preset`. Skipping model spec...');
            continue;
        }
        if (askargusDataProvider.EModelEndpoint[currentEndpoint] && currentEndpoint !== askargusDataProvider.EModelEndpoint.custom) {
            modelSpecs.push(spec);
            continue;
        }
        else if (currentEndpoint === askargusDataProvider.EModelEndpoint.custom) {
            winston.warn(`Model Spec with endpoint "${currentEndpoint}" is not supported. You must specify the name of the custom endpoint (case-sensitive, as defined in your config). Skipping model spec...`);
            continue;
        }
        const normalizedName = askargusDataProvider.normalizeEndpointName(currentEndpoint);
        const endpoint = customEndpoints.find((customEndpoint) => normalizedName === askargusDataProvider.normalizeEndpointName(customEndpoint.name));
        if (!endpoint) {
            winston.warn(`Model spec with endpoint "${currentEndpoint}" was skipped: Endpoint not found in configuration. The \`endpoint\` value must exactly match either a system-defined endpoint or a custom endpoint defined by the user.

For more information, see the documentation at https://www.askargus.ai/docs/configuration/askargus_yaml/object_structure/model_specs#endpoint`);
            continue;
        }
        modelSpecs.push({
            ...spec,
            preset: {
                ...spec.preset,
                endpoint: normalizedName,
            },
        });
    }
    return {
        ..._modelSpecs,
        list: modelSpecs,
    };
}

exports.processModelSpecs = processModelSpecs;
//# sourceMappingURL=specs.cjs.map
