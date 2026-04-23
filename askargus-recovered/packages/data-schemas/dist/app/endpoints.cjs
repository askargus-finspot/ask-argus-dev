'use strict';

var askargusDataProvider = require('askargus-data-provider');
var assistants = require('./assistants.cjs');
var agents = require('./agents.cjs');
var azure = require('./azure.cjs');
var vertex = require('./vertex.cjs');

/**
 * Loads custom config endpoints
 * @param [config]
 * @param [agentsDefaults]
 */
const loadEndpoints = (config, agentsDefaults) => {
    var _a;
    const loadedEndpoints = {};
    const endpoints = config === null || config === void 0 ? void 0 : config.endpoints;
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.azureOpenAI]) {
        loadedEndpoints[askargusDataProvider.EModelEndpoint.azureOpenAI] = azure.azureConfigSetup(config);
    }
    if ((_a = endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.azureOpenAI]) === null || _a === void 0 ? void 0 : _a.assistants) {
        loadedEndpoints[askargusDataProvider.EModelEndpoint.azureAssistants] = assistants.azureAssistantsDefaults();
    }
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.azureAssistants]) {
        loadedEndpoints[askargusDataProvider.EModelEndpoint.azureAssistants] = assistants.assistantsConfigSetup(config, askargusDataProvider.EModelEndpoint.azureAssistants, loadedEndpoints[askargusDataProvider.EModelEndpoint.azureAssistants]);
    }
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.assistants]) {
        loadedEndpoints[askargusDataProvider.EModelEndpoint.assistants] = assistants.assistantsConfigSetup(config, askargusDataProvider.EModelEndpoint.assistants, loadedEndpoints[askargusDataProvider.EModelEndpoint.assistants]);
    }
    loadedEndpoints[askargusDataProvider.EModelEndpoint.agents] = agents.agentsConfigSetup(config, agentsDefaults);
    // Handle Anthropic endpoint with Vertex AI configuration
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[askargusDataProvider.EModelEndpoint.anthropic]) {
        const anthropicConfig = endpoints[askargusDataProvider.EModelEndpoint.anthropic];
        const vertexConfig = vertex.vertexConfigSetup(config);
        loadedEndpoints[askargusDataProvider.EModelEndpoint.anthropic] = {
            ...anthropicConfig,
            // If Vertex AI is enabled, use the visible model names from vertex config
            // Otherwise, use the models array from anthropic config
            ...((vertexConfig === null || vertexConfig === void 0 ? void 0 : vertexConfig.modelNames) && { models: vertexConfig.modelNames }),
            // Attach validated Vertex AI config if present
            ...(vertexConfig && { vertexConfig }),
        };
    }
    const endpointKeys = [
        askargusDataProvider.EModelEndpoint.openAI,
        askargusDataProvider.EModelEndpoint.google,
        askargusDataProvider.EModelEndpoint.custom,
        askargusDataProvider.EModelEndpoint.bedrock,
    ];
    endpointKeys.forEach((key) => {
        const currentKey = key;
        if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[currentKey]) {
            loadedEndpoints[currentKey] = endpoints[currentKey];
        }
    });
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints.all) {
        loadedEndpoints.all = endpoints.all;
    }
    return loadedEndpoints;
};

exports.loadEndpoints = loadEndpoints;
//# sourceMappingURL=endpoints.cjs.map
