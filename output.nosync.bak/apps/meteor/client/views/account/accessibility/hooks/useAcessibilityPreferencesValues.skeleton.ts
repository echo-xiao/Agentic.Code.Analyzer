## File: apps/meteor/client/views/account/accessibility/hooks/useAcessibilityPreferencesValues.ts

```typescript
import type { ThemePreference } from '@rocket.chat/core-typings';
import type { FontSize } from '@rocket.chat/rest-typings';
import { useUserPreference } from '@rocket.chat/ui-contexts';

export type AccessibilityPreferencesData = {
	themeAppearence?: ThemePreference;
	fontSize?: FontSize;
	fontSizePreference?: FontSize;
	mentionsWithSymbol?: boolean;
	clockMode?: 0 | 1 | 2;
	hideUsernames?: boolean;
	hideRoles?: boolean;
};

export const useAccessiblityPreferencesValues = (): AccessibilityPreferencesData => {
    /* Implementation Hidden */
};

```