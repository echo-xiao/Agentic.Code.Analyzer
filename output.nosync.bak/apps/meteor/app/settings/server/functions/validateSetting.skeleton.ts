## File: apps/meteor/app/settings/server/functions/validateSetting.ts

```typescript
import { isActionSettingWithEndpoint, type ISetting } from '@rocket.chat/core-typings';

export const validateSetting = <T extends ISetting>(_id: T['_id'], type: T['type'], value: T['value'] | unknown): boolean => {
    /* Implementation Hidden */
};

```