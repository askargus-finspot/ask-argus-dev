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
export function extractAskArgusParams(
  options?: DynamicSettingProps['conversation'],
): AskArgusParams {
  if (!options) {
    return {
      modelOptions: {} as Omit<NonNullable<DynamicSettingProps['conversation']>, AskArgusKeys>,
      resendFiles: askargus.resendFiles.default as boolean,
    };
  }

  const modelOptions = { ...options };

  const resendFiles =
    (delete modelOptions.resendFiles, options.resendFiles) ??
    (askargus.resendFiles.default as boolean);
  const promptPrefix = (delete modelOptions.promptPrefix, options.promptPrefix);
  const maxContextTokens = (delete modelOptions.maxContextTokens, options.maxContextTokens);
  const fileTokenLimit = (delete modelOptions.fileTokenLimit, options.fileTokenLimit);
  const modelLabel = (delete modelOptions.modelLabel, options.modelLabel);

  return {
    modelOptions: modelOptions as Omit<
      NonNullable<DynamicSettingProps['conversation']>,
      AskArgusKeys
    >,
    maxContextTokens,
    fileTokenLimit,
    promptPrefix,
    resendFiles,
    modelLabel,
  };
}
