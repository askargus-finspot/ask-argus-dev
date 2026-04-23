'use strict';

var askargusDataProvider = require('askargus-data-provider');
var _interface = require('./interface.cjs');
var turnstile = require('./turnstile.cjs');
var agents = require('./agents.cjs');
var web = require('./web.cjs');
var specs = require('./specs.cjs');
var memory = require('./memory.cjs');
var endpoints = require('./endpoints.cjs');
var ocr = require('./ocr.cjs');
var winston = require('../config/winston.cjs');

function loadSummarizationConfig(config) {
    const raw = config.summarization;
    if (!raw || typeof raw !== 'object') {
        return undefined;
    }
    const parsed = askargusDataProvider.summarizationConfigSchema.safeParse(raw);
    if (!parsed.success) {
        winston.warn('[AppService] Invalid summarization config', parsed.error.flatten());
        return undefined;
    }
    return {
        ...parsed.data,
        enabled: parsed.data.enabled !== false,
    };
}
/**
 * Loads custom config and initializes app-wide variables.
 * @function AppService
 */
const AppService = async (params) => {
    var _a, _b, _c, _d, _e, _f;
    const { config, paths, systemTools } = params || {};
    if (!config) {
        throw new Error('Config is required');
    }
    const configDefaults = askargusDataProvider.getConfigDefaults();
    const ocr$1 = ocr.loadOCRConfig(config.ocr);
    const webSearch = web.loadWebSearchConfig(config.webSearch);
    const memory$1 = memory.loadMemoryConfig(config.memory);
    const summarization = loadSummarizationConfig(config);
    const filteredTools = config.filteredTools;
    const includedTools = config.includedTools;
    const fileStrategy = ((_a = config.fileStrategy) !== null && _a !== void 0 ? _a : configDefaults.fileStrategy);
    const startBalance = process.env.START_BALANCE;
    const balance = (_b = config.balance) !== null && _b !== void 0 ? _b : {
        enabled: ((_c = process.env.CHECK_BALANCE) === null || _c === void 0 ? void 0 : _c.toLowerCase().trim()) === 'true',
        startBalance: startBalance ? parseInt(startBalance, 10) : undefined,
    };
    const transactions = (_d = config.transactions) !== null && _d !== void 0 ? _d : configDefaults.transactions;
    const imageOutputType = (_e = config === null || config === void 0 ? void 0 : config.imageOutputType) !== null && _e !== void 0 ? _e : configDefaults.imageOutputType;
    process.env.CDN_PROVIDER = fileStrategy;
    const availableTools = systemTools;
    const mcpServersConfig = config.mcpServers || null;
    const mcpSettings = config.mcpSettings || null;
    const actions = config.actions;
    const registration = (_f = config.registration) !== null && _f !== void 0 ? _f : configDefaults.registration;
    const interfaceConfig = await _interface.loadDefaultInterface({ config, configDefaults });
    const turnstileConfig = turnstile.loadTurnstileConfig(config, configDefaults);
    const speech = config.speech;
    const defaultConfig = {
        ocr: ocr$1,
        paths,
        config,
        memory: memory$1,
        speech,
        balance,
        actions,
        webSearch,
        mcpSettings,
        transactions,
        fileStrategy,
        registration,
        filteredTools,
        includedTools,
        summarization,
        availableTools,
        imageOutputType,
        interfaceConfig,
        turnstileConfig,
        mcpConfig: mcpServersConfig,
        fileStrategies: config.fileStrategies,
    };
    const agentsDefaults = agents.agentsConfigSetup(config);
    if (!Object.keys(config).length) {
        const appConfig = {
            ...defaultConfig,
            endpoints: {
                [askargusDataProvider.EModelEndpoint.agents]: agentsDefaults,
            },
        };
        return appConfig;
    }
    const loadedEndpoints = endpoints.loadEndpoints(config, agentsDefaults);
    const appConfig = {
        ...defaultConfig,
        fileConfig: config === null || config === void 0 ? void 0 : config.fileConfig,
        secureImageLinks: config === null || config === void 0 ? void 0 : config.secureImageLinks,
        modelSpecs: specs.processModelSpecs(config === null || config === void 0 ? void 0 : config.endpoints, config.modelSpecs, interfaceConfig),
        endpoints: loadedEndpoints,
    };
    return appConfig;
};

exports.AppService = AppService;
//# sourceMappingURL=service.cjs.map
