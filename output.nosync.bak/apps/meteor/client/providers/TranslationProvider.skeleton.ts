## File: apps/meteor/client/providers/TranslationProvider.tsx

```typescript
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import {
	addSprinfToI18n,
	extractTranslationKeys,
	applyCustomTranslations,
	availableTranslationNamespaces,
	defaultTranslationNamespace,
	extractTranslationNamespaces,
} from '@rocket.chat/i18n';
import languages from '@rocket.chat/i18n/dist/languages';
import en from '@rocket.chat/i18n/dist/resources/en.i18n.json';
import { capitalize } from '@rocket.chat/string-helpers';
import { normalizeLanguage } from '@rocket.chat/tools';
import type { TranslationContextValue } from '@rocket.chat/ui-contexts';
import { useSetting, TranslationContext } from '@rocket.chat/ui-contexts';
import type i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';

import { getURL } from '../../app/utils/client';
import { i18n } from '../../app/utils/lib/i18n';
import { AppClientOrchestratorInstance } from '../apps/orchestrator';
import { onLoggedIn } from '../lib/loggedIn';
import { isRTLScriptLanguage } from '../lib/utils/isRTLScriptLanguage';
import { setDateFnsLocale } from '../lib/utils/setDateFnsLocale';

i18n.use(I18NextHttpBackend).use(initReactI18next);

const useCustomTranslations = (i18n: typeof i18next) => {
    /* Implementation Hidden */
};

const localeCache = new Map<string, Promise<string>>();
let isI18nInitialized = false;

const useI18next = (lng: string): typeof i18next => {
    /* Implementation Hidden */
};

const useAutoLanguage = () => {
    /* Implementation Hidden */
};

const getNorthernSamiDisplayName = (lng: string) => {
    /* Implementation Hidden */
};

const getLanguageName = (code: string, lng: string): string => {
    /* Implementation Hidden */
};

export type TranslationProviderProps = {
	children: ReactNode;
};

const TranslationProvider = ({ children }: TranslationProviderProps) => {
    /* Implementation Hidden */
};

/**
 * I was forced to create this component to keep the api useTranslation from rocketchat
 * rocketchat useTranslation invalidates the provider content, triggering all the places that use it
 * i18next triggers a re-render inside useTranslation, since now we are using 100% of the i18next
 * the only way to invalidate after changing the language in a safe way is using the useTranslation from i8next
 * and invalidating the provider content
 */
// eslint-disable-next-line react/no-multi-comp
const TranslationProviderInner = ({
	children,
	availableLanguages,
}: {
	children: ReactNode;
	availableLanguages: {
		en: string;
		name: string;
		ogName: string;
		key: string;
	}[];
}) => {
    /* Implementation Hidden */
};

export default TranslationProvider;

```