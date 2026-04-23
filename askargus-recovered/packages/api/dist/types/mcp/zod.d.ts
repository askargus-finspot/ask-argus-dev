import { z } from 'zod';
import type { JsonSchemaType, ConvertJsonSchemaToZodOptions } from '@askargus/data-schemas';
/**
 * Helper function to resolve $ref references
 * @param schema - The schema to resolve
 * @param definitions - The definitions to use
 * @param visited - The set of visited references
 * @returns The resolved schema
 */
export declare function resolveJsonSchemaRefs<T extends Record<string, unknown>>(schema: T, definitions?: Record<string, unknown>, visited?: Set<string>): T;
/**
 * Recursively normalizes a JSON schema for LLM API compatibility.
 *
 * Transformations applied:
 * - Converts `const` values to `enum` arrays (Gemini/Vertex AI rejects `const`)
 * - Strips vendor extension fields (`x-*` prefixed keys, e.g. `x-google-enum-descriptions`)
 * - Strips leftover `$defs`/`definitions` blocks that may survive ref resolution
 *
 * @param schema - The JSON schema to normalize
 * @returns The normalized schema
 */
export declare function normalizeJsonSchema<T extends Record<string, unknown>>(schema: T): T;
/**
 * Converts a JSON Schema to a Zod schema.
 *
 * @deprecated This function is deprecated in favor of using JSON schemas directly.
 * LangChain.js now supports JSON schemas natively, eliminating the need for Zod conversion.
 * Use `resolveJsonSchemaRefs` to handle $ref references and pass the JSON schema directly to tools.
 *
 * @see https://js.langchain.com/docs/how_to/custom_tools/
 */
export declare function convertJsonSchemaToZod(schema: JsonSchemaType & Record<string, unknown>, options?: ConvertJsonSchemaToZodOptions): z.ZodType | undefined;
/**
 * Helper function that resolves refs before converting to Zod.
 *
 * @deprecated This function is deprecated in favor of using JSON schemas directly.
 * LangChain.js now supports JSON schemas natively, eliminating the need for Zod conversion.
 * Use `resolveJsonSchemaRefs` to handle $ref references and pass the JSON schema directly to tools.
 *
 * @see https://js.langchain.com/docs/how_to/custom_tools/
 */
export declare function convertWithResolvedRefs(schema: JsonSchemaType & Record<string, unknown>, options?: ConvertJsonSchemaToZodOptions): z.ZodType<any, z.ZodTypeDef, any> | undefined;
//# sourceMappingURL=zod.d.ts.map