import { TOptions } from 'i18next';
import { resources } from '~/locales/i18n';
export type TranslationKeys = keyof typeof resources.en.translation;
/** Language lifecycle is managed by the host app — do not add i18n.changeLanguage() calls here. */
export default function useLocalize(): (phraseKey: TranslationKeys, options?: TOptions) => string;
//# sourceMappingURL=useLocalize.d.ts.map