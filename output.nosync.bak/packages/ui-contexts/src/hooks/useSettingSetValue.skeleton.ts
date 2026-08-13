## File: packages/ui-contexts/src/hooks/useSettingSetValue.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { useCallback } from 'react';

import { useSettingsDispatch } from './useSettingsDispatch';

export const useSettingSetValue = <T extends ISetting['value']>(_id: ISetting['_id']): ((value: T) => Promise<void>) => {
    /* Implementation Hidden */
};

```