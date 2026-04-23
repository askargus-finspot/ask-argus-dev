import { z } from 'zod';
import type { TModelSpecPreset } from './schemas';
import { EModelEndpoint, AuthType } from './schemas';
export type TModelSpec = {
    name: string;
    label: string;
    preset: TModelSpecPreset;
    order?: number;
    default?: boolean;
    description?: string;
    /**
     * Optional group name for organizing specs in the UI selector.
     * - If it matches an endpoint name (e.g., "openAI", "groq"), the spec appears nested under that endpoint
     * - If it's a custom name (doesn't match any endpoint), it creates a separate collapsible group
     * - If omitted, the spec appears as a standalone item at the top level
     */
    group?: string;
    /**
     * Optional icon URL for the group this spec belongs to.
     * Only needs to be set on one spec per group - the first one found with a groupIcon will be used.
     * Can be a URL or an endpoint name to use its icon.
     */
    groupIcon?: string | EModelEndpoint;
    showIconInMenu?: boolean;
    showIconInHeader?: boolean;
    iconURL?: string | EModelEndpoint;
    authType?: AuthType;
    webSearch?: boolean;
    fileSearch?: boolean;
    executeCode?: boolean;
    artifacts?: string | boolean;
    mcpServers?: string[];
};
export declare const tModelSpecSchema: z.ZodObject<{
    name: z.ZodString;
    label: z.ZodString;
    preset: z.ZodObject<Omit<{
        endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
        isArchived: z.ZodOptional<z.ZodBoolean>;
        user: z.ZodOptional<z.ZodString>;
        messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            pluginKey: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            authConfig: z.ZodOptional<z.ZodArray<z.ZodObject<{
                authField: z.ZodString;
                label: z.ZodString;
                description: z.ZodString;
                optional: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }, {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }>, "many">>;
            authenticated: z.ZodOptional<z.ZodBoolean>;
            chatMenu: z.ZodOptional<z.ZodBoolean>;
            isButton: z.ZodOptional<z.ZodBoolean>;
            toolkit: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }, {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
        modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        userLabel: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        promptPrefix: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        topP: z.ZodOptional<z.ZodNumber>;
        topK: z.ZodOptional<z.ZodNumber>;
        top_p: z.ZodOptional<z.ZodNumber>;
        frequency_penalty: z.ZodOptional<z.ZodNumber>;
        presence_penalty: z.ZodOptional<z.ZodNumber>;
        parentMessageId: z.ZodOptional<z.ZodString>;
        maxOutputTokens: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>>;
        maxContextTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
        max_tokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
        promptCache: z.ZodOptional<z.ZodBoolean>;
        system: z.ZodOptional<z.ZodString>;
        thinking: z.ZodOptional<z.ZodBoolean>;
        thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
        thinkingLevel: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ThinkingLevel>>;
        stream: z.ZodOptional<z.ZodBoolean>;
        artifacts: z.ZodOptional<z.ZodString>;
        context: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        examples: z.ZodOptional<z.ZodArray<z.ZodObject<{
            input: z.ZodObject<{
                content: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>;
            output: z.ZodObject<{
                content: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }, {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }>, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        resendFiles: z.ZodOptional<z.ZodBoolean>;
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ImageDetail>>;
        reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningEffort>>>;
        reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningSummary>>>;
        verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").Verbosity>>>;
        useResponsesApi: z.ZodOptional<z.ZodBoolean>;
        effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").AnthropicEffort>>>;
        web_search: z.ZodOptional<z.ZodBoolean>;
        disableStreaming: z.ZodOptional<z.ZodBoolean>;
        assistant_id: z.ZodOptional<z.ZodString>;
        agent_id: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
        additionalModelRequestFields: z.ZodOptional<z.ZodType<string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null>>;
        instructions: z.ZodOptional<z.ZodString>;
        additional_instructions: z.ZodOptional<z.ZodString>;
        append_current_datetime: z.ZodOptional<z.ZodBoolean>;
        presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        greeting: z.ZodOptional<z.ZodString>;
        spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
        resendImages: z.ZodOptional<z.ZodBoolean>;
        chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    } & {
        conversationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        defaultPreset: z.ZodOptional<z.ZodBoolean>;
        order: z.ZodOptional<z.ZodNumber>;
        endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
    }, "conversationId" | "isArchived" | "title" | "user" | "messages" | "parentMessageId" | "tags" | "file_ids" | "presetOverride" | "greeting" | "spec" | "iconURL" | "expiredAt" | "resendImages" | "chatGptLabel" | "presetId" | "defaultPreset" | "order">, "strip", z.ZodTypeAny, {
        endpoint: string | null;
        endpointType?: EModelEndpoint | null | undefined;
        tools?: string[] | {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }[] | undefined;
        modelLabel?: string | null | undefined;
        userLabel?: string | undefined;
        model?: string | null | undefined;
        promptPrefix?: string | null | undefined;
        temperature?: number | null | undefined;
        topP?: number | undefined;
        topK?: number | undefined;
        top_p?: number | undefined;
        frequency_penalty?: number | undefined;
        presence_penalty?: number | undefined;
        maxOutputTokens?: number | null | undefined;
        maxContextTokens?: number | undefined;
        max_tokens?: number | undefined;
        promptCache?: boolean | undefined;
        system?: string | undefined;
        thinking?: boolean | undefined;
        thinkingBudget?: number | undefined;
        thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
        stream?: boolean | undefined;
        artifacts?: string | undefined;
        context?: string | null | undefined;
        examples?: {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }[] | undefined;
        resendFiles?: boolean | undefined;
        imageDetail?: import("./schemas").ImageDetail | undefined;
        reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
        reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
        verbosity?: import("./schemas").Verbosity | null | undefined;
        useResponsesApi?: boolean | undefined;
        effort?: import("./schemas").AnthropicEffort | null | undefined;
        web_search?: boolean | undefined;
        disableStreaming?: boolean | undefined;
        assistant_id?: string | undefined;
        agent_id?: string | undefined;
        region?: string | undefined;
        maxTokens?: number | undefined;
        additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null) | undefined;
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        stop?: string[] | undefined;
        fileTokenLimit?: number | undefined;
    }, {
        endpoint: string | null;
        endpointType?: EModelEndpoint | null | undefined;
        tools?: string[] | {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }[] | undefined;
        modelLabel?: string | null | undefined;
        userLabel?: string | undefined;
        model?: string | null | undefined;
        promptPrefix?: string | null | undefined;
        temperature?: number | null | undefined;
        topP?: number | undefined;
        topK?: number | undefined;
        top_p?: number | undefined;
        frequency_penalty?: number | undefined;
        presence_penalty?: number | undefined;
        maxOutputTokens?: string | number | null | undefined;
        maxContextTokens?: string | number | undefined;
        max_tokens?: string | number | undefined;
        promptCache?: boolean | undefined;
        system?: string | undefined;
        thinking?: boolean | undefined;
        thinkingBudget?: string | number | undefined;
        thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
        stream?: boolean | undefined;
        artifacts?: string | undefined;
        context?: string | null | undefined;
        examples?: {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }[] | undefined;
        resendFiles?: boolean | undefined;
        imageDetail?: import("./schemas").ImageDetail | undefined;
        reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
        reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
        verbosity?: import("./schemas").Verbosity | null | undefined;
        useResponsesApi?: boolean | undefined;
        effort?: import("./schemas").AnthropicEffort | null | undefined;
        web_search?: boolean | undefined;
        disableStreaming?: boolean | undefined;
        assistant_id?: string | undefined;
        agent_id?: string | undefined;
        region?: string | undefined;
        maxTokens?: string | number | undefined;
        additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null) | undefined;
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        stop?: string[] | undefined;
        fileTokenLimit?: string | number | undefined;
    }>;
    order: z.ZodOptional<z.ZodNumber>;
    default: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    groupIcon: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
    showIconInMenu: z.ZodOptional<z.ZodBoolean>;
    showIconInHeader: z.ZodOptional<z.ZodBoolean>;
    iconURL: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
    authType: z.ZodOptional<z.ZodNativeEnum<typeof AuthType>>;
    webSearch: z.ZodOptional<z.ZodBoolean>;
    fileSearch: z.ZodOptional<z.ZodBoolean>;
    executeCode: z.ZodOptional<z.ZodBoolean>;
    artifacts: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>;
    mcpServers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    label: string;
    preset: {
        endpoint: string | null;
        endpointType?: EModelEndpoint | null | undefined;
        tools?: string[] | {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }[] | undefined;
        modelLabel?: string | null | undefined;
        userLabel?: string | undefined;
        model?: string | null | undefined;
        promptPrefix?: string | null | undefined;
        temperature?: number | null | undefined;
        topP?: number | undefined;
        topK?: number | undefined;
        top_p?: number | undefined;
        frequency_penalty?: number | undefined;
        presence_penalty?: number | undefined;
        maxOutputTokens?: number | null | undefined;
        maxContextTokens?: number | undefined;
        max_tokens?: number | undefined;
        promptCache?: boolean | undefined;
        system?: string | undefined;
        thinking?: boolean | undefined;
        thinkingBudget?: number | undefined;
        thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
        stream?: boolean | undefined;
        artifacts?: string | undefined;
        context?: string | null | undefined;
        examples?: {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }[] | undefined;
        resendFiles?: boolean | undefined;
        imageDetail?: import("./schemas").ImageDetail | undefined;
        reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
        reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
        verbosity?: import("./schemas").Verbosity | null | undefined;
        useResponsesApi?: boolean | undefined;
        effort?: import("./schemas").AnthropicEffort | null | undefined;
        web_search?: boolean | undefined;
        disableStreaming?: boolean | undefined;
        assistant_id?: string | undefined;
        agent_id?: string | undefined;
        region?: string | undefined;
        maxTokens?: number | undefined;
        additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null) | undefined;
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        stop?: string[] | undefined;
        fileTokenLimit?: number | undefined;
    };
    description?: string | undefined;
    artifacts?: string | boolean | undefined;
    iconURL?: string | undefined;
    order?: number | undefined;
    default?: boolean | undefined;
    group?: string | undefined;
    groupIcon?: string | undefined;
    showIconInMenu?: boolean | undefined;
    showIconInHeader?: boolean | undefined;
    authType?: AuthType | undefined;
    webSearch?: boolean | undefined;
    fileSearch?: boolean | undefined;
    executeCode?: boolean | undefined;
    mcpServers?: string[] | undefined;
}, {
    name: string;
    label: string;
    preset: {
        endpoint: string | null;
        endpointType?: EModelEndpoint | null | undefined;
        tools?: string[] | {
            name: string;
            pluginKey: string;
            description?: string | undefined;
            icon?: string | undefined;
            authConfig?: {
                description: string;
                authField: string;
                label: string;
                optional?: boolean | undefined;
            }[] | undefined;
            authenticated?: boolean | undefined;
            chatMenu?: boolean | undefined;
            isButton?: boolean | undefined;
            toolkit?: boolean | undefined;
        }[] | undefined;
        modelLabel?: string | null | undefined;
        userLabel?: string | undefined;
        model?: string | null | undefined;
        promptPrefix?: string | null | undefined;
        temperature?: number | null | undefined;
        topP?: number | undefined;
        topK?: number | undefined;
        top_p?: number | undefined;
        frequency_penalty?: number | undefined;
        presence_penalty?: number | undefined;
        maxOutputTokens?: string | number | null | undefined;
        maxContextTokens?: string | number | undefined;
        max_tokens?: string | number | undefined;
        promptCache?: boolean | undefined;
        system?: string | undefined;
        thinking?: boolean | undefined;
        thinkingBudget?: string | number | undefined;
        thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
        stream?: boolean | undefined;
        artifacts?: string | undefined;
        context?: string | null | undefined;
        examples?: {
            input: {
                content: string;
            };
            output: {
                content: string;
            };
        }[] | undefined;
        resendFiles?: boolean | undefined;
        imageDetail?: import("./schemas").ImageDetail | undefined;
        reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
        reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
        verbosity?: import("./schemas").Verbosity | null | undefined;
        useResponsesApi?: boolean | undefined;
        effort?: import("./schemas").AnthropicEffort | null | undefined;
        web_search?: boolean | undefined;
        disableStreaming?: boolean | undefined;
        assistant_id?: string | undefined;
        agent_id?: string | undefined;
        region?: string | undefined;
        maxTokens?: string | number | undefined;
        additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
            [key: string]: string | number | boolean | any | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null)[] | {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
        } | null) | undefined;
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        stop?: string[] | undefined;
        fileTokenLimit?: string | number | undefined;
    };
    description?: string | undefined;
    artifacts?: string | boolean | undefined;
    iconURL?: string | undefined;
    order?: number | undefined;
    default?: boolean | undefined;
    group?: string | undefined;
    groupIcon?: string | undefined;
    showIconInMenu?: boolean | undefined;
    showIconInHeader?: boolean | undefined;
    authType?: AuthType | undefined;
    webSearch?: boolean | undefined;
    fileSearch?: boolean | undefined;
    executeCode?: boolean | undefined;
    mcpServers?: string[] | undefined;
}>;
export declare const specsConfigSchema: z.ZodObject<{
    enforce: z.ZodDefault<z.ZodBoolean>;
    prioritize: z.ZodDefault<z.ZodBoolean>;
    list: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        label: z.ZodString;
        preset: z.ZodObject<Omit<{
            endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
            isArchived: z.ZodOptional<z.ZodBoolean>;
            user: z.ZodOptional<z.ZodString>;
            messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                pluginKey: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                icon: z.ZodOptional<z.ZodString>;
                authConfig: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    authField: z.ZodString;
                    label: z.ZodString;
                    description: z.ZodString;
                    optional: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }, {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }>, "many">>;
                authenticated: z.ZodOptional<z.ZodBoolean>;
                chatMenu: z.ZodOptional<z.ZodBoolean>;
                isButton: z.ZodOptional<z.ZodBoolean>;
                toolkit: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }, {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
            modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            userLabel: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            promptPrefix: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            parentMessageId: z.ZodOptional<z.ZodString>;
            maxOutputTokens: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>>;
            maxContextTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
            max_tokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
            promptCache: z.ZodOptional<z.ZodBoolean>;
            system: z.ZodOptional<z.ZodString>;
            thinking: z.ZodOptional<z.ZodBoolean>;
            thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
            thinkingLevel: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ThinkingLevel>>;
            stream: z.ZodOptional<z.ZodBoolean>;
            artifacts: z.ZodOptional<z.ZodString>;
            context: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            examples: z.ZodOptional<z.ZodArray<z.ZodObject<{
                input: z.ZodObject<{
                    content: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    content: string;
                }, {
                    content: string;
                }>;
                output: z.ZodObject<{
                    content: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    content: string;
                }, {
                    content: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }, {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }>, "many">>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            resendFiles: z.ZodOptional<z.ZodBoolean>;
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ImageDetail>>;
            reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningEffort>>>;
            reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningSummary>>>;
            verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").Verbosity>>>;
            useResponsesApi: z.ZodOptional<z.ZodBoolean>;
            effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").AnthropicEffort>>>;
            web_search: z.ZodOptional<z.ZodBoolean>;
            disableStreaming: z.ZodOptional<z.ZodBoolean>;
            assistant_id: z.ZodOptional<z.ZodString>;
            agent_id: z.ZodOptional<z.ZodString>;
            region: z.ZodOptional<z.ZodString>;
            maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
            additionalModelRequestFields: z.ZodOptional<z.ZodType<string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null>>;
            instructions: z.ZodOptional<z.ZodString>;
            additional_instructions: z.ZodOptional<z.ZodString>;
            append_current_datetime: z.ZodOptional<z.ZodBoolean>;
            presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            greeting: z.ZodOptional<z.ZodString>;
            spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
            resendImages: z.ZodOptional<z.ZodBoolean>;
            chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        } & {
            conversationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            defaultPreset: z.ZodOptional<z.ZodBoolean>;
            order: z.ZodOptional<z.ZodNumber>;
            endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
        }, "conversationId" | "isArchived" | "title" | "user" | "messages" | "parentMessageId" | "tags" | "file_ids" | "presetOverride" | "greeting" | "spec" | "iconURL" | "expiredAt" | "resendImages" | "chatGptLabel" | "presetId" | "defaultPreset" | "order">, "strip", z.ZodTypeAny, {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: number | null | undefined;
            maxContextTokens?: number | undefined;
            max_tokens?: number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: number | undefined;
        }, {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: string | number | null | undefined;
            maxContextTokens?: string | number | undefined;
            max_tokens?: string | number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: string | number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: string | number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: string | number | undefined;
        }>;
        order: z.ZodOptional<z.ZodNumber>;
        default: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        group: z.ZodOptional<z.ZodString>;
        groupIcon: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
        showIconInMenu: z.ZodOptional<z.ZodBoolean>;
        showIconInHeader: z.ZodOptional<z.ZodBoolean>;
        iconURL: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
        authType: z.ZodOptional<z.ZodNativeEnum<typeof AuthType>>;
        webSearch: z.ZodOptional<z.ZodBoolean>;
        fileSearch: z.ZodOptional<z.ZodBoolean>;
        executeCode: z.ZodOptional<z.ZodBoolean>;
        artifacts: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>;
        mcpServers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: number | null | undefined;
            maxContextTokens?: number | undefined;
            max_tokens?: number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: number | undefined;
        };
        description?: string | undefined;
        artifacts?: string | boolean | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        groupIcon?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }, {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: string | number | null | undefined;
            maxContextTokens?: string | number | undefined;
            max_tokens?: string | number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: string | number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: string | number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: string | number | undefined;
        };
        description?: string | undefined;
        artifacts?: string | boolean | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        groupIcon?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }>, "many">;
    addedEndpoints: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
}, "strip", z.ZodTypeAny, {
    enforce: boolean;
    prioritize: boolean;
    list: {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: number | null | undefined;
            maxContextTokens?: number | undefined;
            max_tokens?: number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: number | undefined;
        };
        description?: string | undefined;
        artifacts?: string | boolean | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        groupIcon?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }[];
    addedEndpoints?: string[] | undefined;
}, {
    list: {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            endpointType?: EModelEndpoint | null | undefined;
            tools?: string[] | {
                name: string;
                pluginKey: string;
                description?: string | undefined;
                icon?: string | undefined;
                authConfig?: {
                    description: string;
                    authField: string;
                    label: string;
                    optional?: boolean | undefined;
                }[] | undefined;
                authenticated?: boolean | undefined;
                chatMenu?: boolean | undefined;
                isButton?: boolean | undefined;
                toolkit?: boolean | undefined;
            }[] | undefined;
            modelLabel?: string | null | undefined;
            userLabel?: string | undefined;
            model?: string | null | undefined;
            promptPrefix?: string | null | undefined;
            temperature?: number | null | undefined;
            topP?: number | undefined;
            topK?: number | undefined;
            top_p?: number | undefined;
            frequency_penalty?: number | undefined;
            presence_penalty?: number | undefined;
            maxOutputTokens?: string | number | null | undefined;
            maxContextTokens?: string | number | undefined;
            max_tokens?: string | number | undefined;
            promptCache?: boolean | undefined;
            system?: string | undefined;
            thinking?: boolean | undefined;
            thinkingBudget?: string | number | undefined;
            thinkingLevel?: import("./schemas").ThinkingLevel | undefined;
            stream?: boolean | undefined;
            artifacts?: string | undefined;
            context?: string | null | undefined;
            examples?: {
                input: {
                    content: string;
                };
                output: {
                    content: string;
                };
            }[] | undefined;
            resendFiles?: boolean | undefined;
            imageDetail?: import("./schemas").ImageDetail | undefined;
            reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
            reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
            verbosity?: import("./schemas").Verbosity | null | undefined;
            useResponsesApi?: boolean | undefined;
            effort?: import("./schemas").AnthropicEffort | null | undefined;
            web_search?: boolean | undefined;
            disableStreaming?: boolean | undefined;
            assistant_id?: string | undefined;
            agent_id?: string | undefined;
            region?: string | undefined;
            maxTokens?: string | number | undefined;
            additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null)[] | {
                [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
            } | null) | undefined;
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            stop?: string[] | undefined;
            fileTokenLimit?: string | number | undefined;
        };
        description?: string | undefined;
        artifacts?: string | boolean | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        groupIcon?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }[];
    enforce?: boolean | undefined;
    prioritize?: boolean | undefined;
    addedEndpoints?: string[] | undefined;
}>;
export type TSpecsConfig = z.infer<typeof specsConfigSchema>;
