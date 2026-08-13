## File: apps/meteor/app/settings/server/functions/getSettingDefaults.ts

```typescript
import type { ISetting, ISettingColor } from '@rocket.chat/core-typings';
import { isSettingColor, isSettingRange } from '@rocket.chat/core-typings';

export const getSettingDefaults = (
	setting: Partial<ISetting> & Pick<ISetting, '_id' | 'value' | 'type'>,
	blockedSettings: Set<string> = new Set(),
	hiddenSettings: Set<string> = new Set(),
	wizardRequiredSettings: Set<string> = new Set(),
): ISetting => {
    /* Implementation Hidden */
};

```