## File: packages/ui-contexts/src/hooks/useSettings.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import type { SettingsContextQuery } from '../SettingsContext';
import { SettingsContext } from '../SettingsContext';

export const useSettings = (query?: SettingsContextQuery): ISetting[] => {
    /* Implementation Hidden */
};

```