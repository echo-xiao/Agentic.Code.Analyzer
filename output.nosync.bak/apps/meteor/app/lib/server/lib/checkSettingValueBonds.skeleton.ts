## File: apps/meteor/app/lib/server/lib/checkSettingValueBonds.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';

const hasNumericBounds = (setting: ISetting): setting is ISetting & { minValue?: number; maxValue?: number } => {
    /* Implementation Hidden */
};

export const checkSettingValueBounds = (setting: ISetting, value?: ISetting['value']): void => {
    /* Implementation Hidden */
};

```