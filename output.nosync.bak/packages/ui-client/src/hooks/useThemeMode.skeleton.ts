## File: packages/ui-client/src/hooks/useThemeMode.ts

```typescript
import type { ThemePreference as ThemeMode, Themes } from '@rocket.chat/core-typings';
import { useDarkMode } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useUserPreference } from '@rocket.chat/ui-contexts';
import { useCallback, useState } from 'react';

/**
 * Returns the current option set by the user, the theme mode resolved given the user configuration and OS (if applies) and a function to set it.
 * @param defaultThemeMode The default theme mode to use if the user has not set any.
 * @returns [currentThemeMode, setThemeMode, resolvedThemeMode]
 */
export const useThemeMode = (): [
	currentThemeMode: ThemeMode,
	setThemeMode: (value: ThemeMode) => () => void,
	resolvedThemeMode: Themes,
] => {
    /* Implementation Hidden */
};

```