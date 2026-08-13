## File: apps/meteor/app/authorization/lib/index.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';

export const getSettingPermissionId = function (settingId: ISetting['_id']) {
    /* Implementation Hidden */
};

export const CONSTANTS = {
	SETTINGS_LEVEL: 'settings',
} as const;

export const confirmationRequiredPermissions = ['access-permissions'];

export { AuthorizationUtils } from './AuthorizationUtils';

```