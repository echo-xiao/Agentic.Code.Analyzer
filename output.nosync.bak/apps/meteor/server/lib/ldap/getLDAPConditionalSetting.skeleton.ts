## File: apps/meteor/server/lib/ldap/getLDAPConditionalSetting.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';

import { settings } from '../../../app/settings/server';

export function getLDAPConditionalSetting<T extends SettingValue = SettingValue>(settingName: string): T | undefined {
    /* Implementation Hidden */
}

```