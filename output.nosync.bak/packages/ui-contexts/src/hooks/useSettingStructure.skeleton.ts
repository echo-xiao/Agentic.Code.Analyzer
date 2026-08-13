## File: packages/ui-contexts/src/hooks/useSettingStructure.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { SettingsContext } from '../SettingsContext';

export const useSettingStructure = (_id: ISetting['_id']): ISetting | undefined => {
    /* Implementation Hidden */
};

```