interface ToolDefLike {
    name: string;
    [key: string]: unknown;
}
interface ToolInstanceLike {
    name: string;
    [key: string]: unknown;
}
export interface BuildToolSetConfig {
    toolDefinitions?: ToolDefLike[];
    tools?: (ToolInstanceLike | null | undefined)[];
}
/**
 * Builds a Set of tool names for use with formatAgentMessages.
 *
 * In event-driven mode, tools are defined via toolDefinitions (which includes
 * deferred tools like tool_search). In legacy mode, tools come from loaded
 * tool instances.
 *
 * This ensures tool_search and other deferred tools are included in the toolSet,
 * allowing their ToolMessages to be preserved in conversation history.
 */
export declare function buildToolSet(agentConfig: BuildToolSetConfig | null | undefined): Set<string>;
export {};
//# sourceMappingURL=tools.d.ts.map