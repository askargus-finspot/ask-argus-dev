import { z } from 'zod';
/**
 * Schema for validating prompt group update payloads.
 * Only allows fields that users should be able to modify.
 * Sensitive fields like author, authorName, _id, productionId, etc. are excluded.
 */
export declare const updatePromptGroupSchema: z.ZodObject<{
    /** The name of the prompt group */
    name: z.ZodOptional<z.ZodString>;
    /** Short description/oneliner for the prompt group */
    oneliner: z.ZodOptional<z.ZodString>;
    /** Category for organizing prompt groups */
    category: z.ZodOptional<z.ZodString>;
    /** Command shortcut for the prompt group */
    command: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    command?: string | null | undefined;
    category?: string | undefined;
    oneliner?: string | undefined;
}, {
    name?: string | undefined;
    command?: string | null | undefined;
    category?: string | undefined;
    oneliner?: string | undefined;
}>;
export type TUpdatePromptGroupSchema = z.infer<typeof updatePromptGroupSchema>;
/**
 * Validates and sanitizes a prompt group update payload.
 * Returns only the allowed fields, stripping any sensitive fields.
 * @param data - The raw request body to validate
 * @returns The validated and sanitized payload
 * @throws ZodError if validation fails
 */
export declare function validatePromptGroupUpdate(data: unknown): TUpdatePromptGroupSchema;
/**
 * Safely validates a prompt group update payload without throwing.
 * @param data - The raw request body to validate
 * @returns A SafeParseResult with either the validated data or validation errors
 */
export declare function safeValidatePromptGroupUpdate(data: unknown): z.SafeParseReturnType<{
    name?: string | undefined;
    command?: string | null | undefined;
    category?: string | undefined;
    oneliner?: string | undefined;
}, {
    name?: string | undefined;
    command?: string | null | undefined;
    category?: string | undefined;
    oneliner?: string | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map