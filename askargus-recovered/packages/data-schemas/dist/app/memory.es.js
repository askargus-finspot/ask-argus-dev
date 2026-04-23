import { memorySchema } from 'askargus-data-provider';

const hasValidAgent = (agent) => !!agent &&
    (('id' in agent && !!agent.id) ||
        ('provider' in agent && 'model' in agent && !!agent.provider && !!agent.model));
const isDisabled = (config) => !config || config.disabled === true;
function loadMemoryConfig(config) {
    var _a;
    if (!config)
        return undefined;
    if (isDisabled(config))
        return config;
    if (!hasValidAgent(config.agent)) {
        return { ...config, disabled: true };
    }
    const charLimit = (_a = memorySchema.shape.charLimit.safeParse(config.charLimit).data) !== null && _a !== void 0 ? _a : 10000;
    return { ...config, charLimit };
}
function isMemoryEnabled(config) {
    if (isDisabled(config))
        return false;
    return hasValidAgent(config.agent);
}

export { isMemoryEnabled, loadMemoryConfig };
//# sourceMappingURL=memory.es.js.map
