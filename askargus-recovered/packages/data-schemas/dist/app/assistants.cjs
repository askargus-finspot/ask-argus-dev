'use strict';

var winston = require('../config/winston.cjs');
var askargusDataProvider = require('askargus-data-provider');

/**
 * Sets up the minimum, default Assistants configuration if Azure OpenAI Assistants option is enabled.
 * @returns The Assistants endpoint configuration.
 */
function azureAssistantsDefaults() {
    return {
        capabilities: [askargusDataProvider.Capabilities.tools, askargusDataProvider.Capabilities.actions, askargusDataProvider.Capabilities.code_interpreter],
        version: askargusDataProvider.defaultAssistantsVersion.azureAssistants,
    };
}
/**
 * Sets up the Assistants configuration from the config (`askargus.yaml`) file.
 * @param config - The loaded custom configuration.
 * @param assistantsEndpoint - The Assistants endpoint name.
 * - The previously loaded assistants configuration from Azure OpenAI Assistants option.
 * @param [prevConfig]
 * @returns The Assistants endpoint configuration.
 */
function assistantsConfigSetup(config, assistantsEndpoint, prevConfig = {}) {
    var _a, _b, _c, _d, _e;
    const assistantsConfig = (_a = config.endpoints) === null || _a === void 0 ? void 0 : _a[assistantsEndpoint];
    const parsedConfig = askargusDataProvider.assistantEndpointSchema.parse(assistantsConfig);
    if (((_b = assistantsConfig === null || assistantsConfig === void 0 ? void 0 : assistantsConfig.supportedIds) === null || _b === void 0 ? void 0 : _b.length) && ((_c = assistantsConfig.excludedIds) === null || _c === void 0 ? void 0 : _c.length)) {
        winston.warn(`Configuration conflict: The '${assistantsEndpoint}' endpoint has both 'supportedIds' and 'excludedIds' defined. The 'excludedIds' will be ignored.`);
    }
    if ((assistantsConfig === null || assistantsConfig === void 0 ? void 0 : assistantsConfig.privateAssistants) &&
        (((_d = assistantsConfig.supportedIds) === null || _d === void 0 ? void 0 : _d.length) || ((_e = assistantsConfig.excludedIds) === null || _e === void 0 ? void 0 : _e.length))) {
        winston.warn(`Configuration conflict: The '${assistantsEndpoint}' endpoint has both 'privateAssistants' and 'supportedIds' or 'excludedIds' defined. The 'supportedIds' and 'excludedIds' will be ignored.`);
    }
    return {
        ...prevConfig,
        retrievalModels: parsedConfig.retrievalModels,
        disableBuilder: parsedConfig.disableBuilder,
        pollIntervalMs: parsedConfig.pollIntervalMs,
        supportedIds: parsedConfig.supportedIds,
        capabilities: parsedConfig.capabilities,
        excludedIds: parsedConfig.excludedIds,
        privateAssistants: parsedConfig.privateAssistants,
        timeoutMs: parsedConfig.timeoutMs,
        streamRate: parsedConfig.streamRate,
        titlePrompt: parsedConfig.titlePrompt,
        titleMethod: parsedConfig.titleMethod,
        titleModel: parsedConfig.titleModel,
        titleEndpoint: parsedConfig.titleEndpoint,
        titlePromptTemplate: parsedConfig.titlePromptTemplate,
    };
}

exports.assistantsConfigSetup = assistantsConfigSetup;
exports.azureAssistantsDefaults = azureAssistantsDefaults;
//# sourceMappingURL=assistants.cjs.map
