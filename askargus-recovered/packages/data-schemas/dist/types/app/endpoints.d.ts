import type { TCustomConfig, TAgentsEndpoint } from 'askargus-data-provider';
/**
 * Loads custom config endpoints
 * @param [config]
 * @param [agentsDefaults]
 */
export declare const loadEndpoints: (config: Partial<TCustomConfig>, agentsDefaults?: Partial<TAgentsEndpoint>) => {
    openAI?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        addParams?: Record<string, unknown> | undefined;
        dropParams?: string[] | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: {
                key: string;
                default?: string | number | boolean | string[] | undefined;
                options?: string[] | undefined;
                type?: import("askargus-data-provider").SettingTypes | undefined;
                description?: string | undefined;
                placeholder?: string | undefined;
                label?: string | undefined;
                showLabel?: boolean | undefined;
                showDefault?: boolean | undefined;
                range?: {
                    min: number;
                    max: number;
                    step?: number | undefined;
                } | undefined;
                enumMappings?: Record<string, string | number | boolean> | undefined;
                component?: import("askargus-data-provider").ComponentTypes | undefined;
                optionType?: import("askargus-data-provider").OptionTypes | undefined;
                columnSpan?: number | undefined;
                columns?: number | undefined;
                labelCode?: boolean | undefined;
                placeholderCode?: boolean | undefined;
                descriptionCode?: boolean | undefined;
                minText?: number | undefined;
                maxText?: number | undefined;
                minTags?: number | undefined;
                maxTags?: number | undefined;
                includeInput?: boolean | undefined;
                descriptionSide?: "top" | "right" | "bottom" | "left" | undefined;
                searchPlaceholder?: string | undefined;
                selectPlaceholder?: string | undefined;
                searchPlaceholderCode?: boolean | undefined;
                selectPlaceholderCode?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: "user" | "system" | "assistant" | undefined;
    }> | undefined;
    google?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        addParams?: Record<string, unknown> | undefined;
        dropParams?: string[] | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: {
                key: string;
                default?: string | number | boolean | string[] | undefined;
                options?: string[] | undefined;
                type?: import("askargus-data-provider").SettingTypes | undefined;
                description?: string | undefined;
                placeholder?: string | undefined;
                label?: string | undefined;
                showLabel?: boolean | undefined;
                showDefault?: boolean | undefined;
                range?: {
                    min: number;
                    max: number;
                    step?: number | undefined;
                } | undefined;
                enumMappings?: Record<string, string | number | boolean> | undefined;
                component?: import("askargus-data-provider").ComponentTypes | undefined;
                optionType?: import("askargus-data-provider").OptionTypes | undefined;
                columnSpan?: number | undefined;
                columns?: number | undefined;
                labelCode?: boolean | undefined;
                placeholderCode?: boolean | undefined;
                descriptionCode?: boolean | undefined;
                minText?: number | undefined;
                maxText?: number | undefined;
                minTags?: number | undefined;
                maxTags?: number | undefined;
                includeInput?: boolean | undefined;
                descriptionSide?: "top" | "right" | "bottom" | "left" | undefined;
                searchPlaceholder?: string | undefined;
                selectPlaceholder?: string | undefined;
                searchPlaceholderCode?: boolean | undefined;
                selectPlaceholderCode?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: "user" | "system" | "assistant" | undefined;
    }> | undefined;
    bedrock?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        addParams?: Record<string, unknown> | undefined;
        dropParams?: string[] | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: {
                key: string;
                default?: string | number | boolean | string[] | undefined;
                options?: string[] | undefined;
                type?: import("askargus-data-provider").SettingTypes | undefined;
                description?: string | undefined;
                placeholder?: string | undefined;
                label?: string | undefined;
                showLabel?: boolean | undefined;
                showDefault?: boolean | undefined;
                range?: {
                    min: number;
                    max: number;
                    step?: number | undefined;
                } | undefined;
                enumMappings?: Record<string, string | number | boolean> | undefined;
                component?: import("askargus-data-provider").ComponentTypes | undefined;
                optionType?: import("askargus-data-provider").OptionTypes | undefined;
                columnSpan?: number | undefined;
                columns?: number | undefined;
                labelCode?: boolean | undefined;
                placeholderCode?: boolean | undefined;
                descriptionCode?: boolean | undefined;
                minText?: number | undefined;
                maxText?: number | undefined;
                minTags?: number | undefined;
                maxTags?: number | undefined;
                includeInput?: boolean | undefined;
                descriptionSide?: "top" | "right" | "bottom" | "left" | undefined;
                searchPlaceholder?: string | undefined;
                selectPlaceholder?: string | undefined;
                searchPlaceholderCode?: boolean | undefined;
                selectPlaceholderCode?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: "user" | "system" | "assistant" | undefined;
    }> | undefined;
    anthropic?: (Partial<{
        baseURL?: string | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        models?: string[] | undefined;
        vertex?: {
            region: string;
            enabled?: boolean | undefined;
            deploymentName?: string | undefined;
            projectId?: string | undefined;
            serviceKeyFile?: string | undefined;
            models?: string[] | Record<string, boolean | {
                deploymentName?: string | undefined;
            }> | undefined;
        } | undefined;
    }> & {
        vertexConfig?: import("askargus-data-provider").TVertexAIConfig | undefined;
    }) | undefined;
    azureOpenAI?: import("askargus-data-provider").TAzureConfig | undefined;
    assistants?: Partial<{
        version: string | number;
        retrievalModels: string[];
        capabilities: import("askargus-data-provider").Capabilities[];
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        disableBuilder?: boolean | undefined;
        pollIntervalMs?: number | undefined;
        timeoutMs?: number | undefined;
        supportedIds?: string[] | undefined;
        excludedIds?: string[] | undefined;
        privateAssistants?: boolean | undefined;
    }> | undefined;
    azureAssistants?: Partial<{
        version: string | number;
        retrievalModels: string[];
        capabilities: import("askargus-data-provider").Capabilities[];
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        disableBuilder?: boolean | undefined;
        pollIntervalMs?: number | undefined;
        timeoutMs?: number | undefined;
        supportedIds?: string[] | undefined;
        excludedIds?: string[] | undefined;
        privateAssistants?: boolean | undefined;
    }> | undefined;
    all?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        addParams?: Record<string, unknown> | undefined;
        dropParams?: string[] | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: {
                key: string;
                default?: string | number | boolean | string[] | undefined;
                options?: string[] | undefined;
                type?: import("askargus-data-provider").SettingTypes | undefined;
                description?: string | undefined;
                placeholder?: string | undefined;
                label?: string | undefined;
                showLabel?: boolean | undefined;
                showDefault?: boolean | undefined;
                range?: {
                    min: number;
                    max: number;
                    step?: number | undefined;
                } | undefined;
                enumMappings?: Record<string, string | number | boolean> | undefined;
                component?: import("askargus-data-provider").ComponentTypes | undefined;
                optionType?: import("askargus-data-provider").OptionTypes | undefined;
                columnSpan?: number | undefined;
                columns?: number | undefined;
                labelCode?: boolean | undefined;
                placeholderCode?: boolean | undefined;
                descriptionCode?: boolean | undefined;
                minText?: number | undefined;
                maxText?: number | undefined;
                minTags?: number | undefined;
                maxTags?: number | undefined;
                includeInput?: boolean | undefined;
                descriptionSide?: "top" | "right" | "bottom" | "left" | undefined;
                searchPlaceholder?: string | undefined;
                selectPlaceholder?: string | undefined;
                searchPlaceholderCode?: boolean | undefined;
                selectPlaceholderCode?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: "user" | "system" | "assistant" | undefined;
    }> | undefined;
    agents?: Partial<{
        disableBuilder: boolean;
        capabilities: import("askargus-data-provider").AgentCapabilities[];
        maxCitations: number;
        maxCitationsPerFile: number;
        minRelevanceScore: number;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        recursionLimit?: number | undefined;
        maxRecursionLimit?: number | undefined;
        allowedProviders?: string[] | undefined;
    }> | undefined;
    custom?: {
        iconURL?: string | undefined;
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, string> | undefined;
        name?: string | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        maxToolResultChars?: number | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        addParams?: Record<string, unknown> | undefined;
        dropParams?: string[] | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: {
                key: string;
                default?: string | number | boolean | string[] | undefined;
                options?: string[] | undefined;
                type?: import("askargus-data-provider").SettingTypes | undefined;
                description?: string | undefined;
                placeholder?: string | undefined;
                label?: string | undefined;
                showLabel?: boolean | undefined;
                showDefault?: boolean | undefined;
                range?: {
                    min: number;
                    max: number;
                    step?: number | undefined;
                } | undefined;
                enumMappings?: Record<string, string | number | boolean> | undefined;
                component?: import("askargus-data-provider").ComponentTypes | undefined;
                optionType?: import("askargus-data-provider").OptionTypes | undefined;
                columnSpan?: number | undefined;
                columns?: number | undefined;
                labelCode?: boolean | undefined;
                placeholderCode?: boolean | undefined;
                descriptionCode?: boolean | undefined;
                minText?: number | undefined;
                maxText?: number | undefined;
                minTags?: number | undefined;
                maxTags?: number | undefined;
                includeInput?: boolean | undefined;
                descriptionSide?: "top" | "right" | "bottom" | "left" | undefined;
                searchPlaceholder?: string | undefined;
                selectPlaceholder?: string | undefined;
                searchPlaceholderCode?: boolean | undefined;
                selectPlaceholderCode?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: "user" | "system" | "assistant" | undefined;
    }[] | undefined;
};
