import type { AuthType } from 'askargus-data-provider';

export type ApiKeyFormData = {
  apiKey: string;
  authType?: string | AuthType;
};
