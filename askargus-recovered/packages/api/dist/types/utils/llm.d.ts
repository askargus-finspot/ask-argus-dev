import { askargus } from 'askargus-data-provider';
import type { DynamicSettingProps } from 'askargus-data-provider';
type AskArgusKeys = keyof typeof askargus;
type AskArgusParams = {
    modelOptions: Omit<NonNullable<DynamicSettingProps['conversation']>, AskArgusKeys>;
    resendFiles: boolean;
    promptPrefix?: string | null;
    maxContextTokens?: number;
    fileTokenLimit?: number;
    modelLabel?: string | null;
};
/**
 * Separates AskArgus-specific parameters from model options
 * @param options - The combined options object
 */
export declare function extractAskArgusParams(options?: DynamicSettingProps['conversation']): AskArgusParams;
export {};
//# sourceMappingURL=llm.d.ts.map