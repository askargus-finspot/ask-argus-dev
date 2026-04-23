/** Extended JSON Schema type that includes standard validation keywords */
export type ExtendedJsonSchema = {
    type?: 'string' | 'number' | 'integer' | 'float' | 'boolean' | 'array' | 'object' | 'null';
    enum?: (string | number | boolean | null)[];
    items?: ExtendedJsonSchema;
    properties?: Record<string, ExtendedJsonSchema>;
    required?: string[];
    description?: string;
    additionalProperties?: boolean | ExtendedJsonSchema;
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    minItems?: number;
    maxItems?: number;
    pattern?: string;
    format?: string;
    default?: unknown;
    const?: unknown;
    oneOf?: ExtendedJsonSchema[];
    anyOf?: ExtendedJsonSchema[];
    allOf?: ExtendedJsonSchema[];
    $ref?: string;
    $defs?: Record<string, ExtendedJsonSchema>;
    definitions?: Record<string, ExtendedJsonSchema>;
};
export interface ToolRegistryDefinition {
    name: string;
    description: string;
    schema: ExtendedJsonSchema;
    description_for_model?: string;
    responseFormat?: 'content_and_artifact' | 'content';
    toolType: 'builtin' | 'mcp' | 'action' | 'custom';
}
/** Google Search tool JSON schema */
export declare const googleSearchSchema: ExtendedJsonSchema;
/** DALL-E 3 tool JSON schema */
export declare const dalle3Schema: ExtendedJsonSchema;
/** Flux API tool JSON schema */
export declare const fluxApiSchema: ExtendedJsonSchema;
/** OpenWeather tool JSON schema */
export declare const openWeatherSchema: ExtendedJsonSchema;
/** Wolfram Alpha tool JSON schema */
export declare const wolframSchema: ExtendedJsonSchema;
/** Stable Diffusion tool JSON schema */
export declare const stableDiffusionSchema: ExtendedJsonSchema;
/** Azure AI Search tool JSON schema */
export declare const azureAISearchSchema: ExtendedJsonSchema;
/** Traversaal Search tool JSON schema */
export declare const traversaalSearchSchema: ExtendedJsonSchema;
/** Tavily Search Results tool JSON schema */
export declare const tavilySearchSchema: ExtendedJsonSchema;
/** File Search tool JSON schema */
export declare const fileSearchSchema: ExtendedJsonSchema;
/** Tool definitions registry - maps tool names to their definitions */
export declare const toolDefinitions: Record<string, ToolRegistryDefinition>;
export declare function getToolDefinition(toolName: string): ToolRegistryDefinition | undefined;
export declare function getAllToolDefinitions(): ToolRegistryDefinition[];
export declare function getToolSchema(toolName: string): ExtendedJsonSchema | undefined;
//# sourceMappingURL=definitions.d.ts.map