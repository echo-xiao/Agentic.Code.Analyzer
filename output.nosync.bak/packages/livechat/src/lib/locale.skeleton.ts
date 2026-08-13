## File: packages/livechat/src/lib/locale.ts

```typescript
import type { Locale } from 'date-fns';

import store from '../store';
import { supportedLocales } from '../supportedLocales';

/**
 * To normalize Language String and return language code
 */
export const normalizeLanguageString = (languageString: string): string => {
    /* Implementation Hidden */
};

/**
 * To get browser Language of user
 */
export const browserLanguage = (): string => navigator.language;

/**
 * This is configured langauge
 */
export const configLanguage = (): string | undefined => {
    /* Implementation Hidden */
};

export const getDateFnsLocale = async (): Promise<Locale> => {
    /* Implementation Hidden */
};

```