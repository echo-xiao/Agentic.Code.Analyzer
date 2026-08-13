## File: apps/meteor/server/lib/authorization/upsertPermissions.ts

```typescript
/* eslint no-multi-spaces: 0 */
import type { IPermission, ISetting } from '@rocket.chat/core-typings';
import { Permissions, Settings } from '@rocket.chat/models';

import { getSettingPermissionId, CONSTANTS } from '../../../app/authorization/lib';
import { permissions } from '../../../app/authorization/server/constant/permissions';
import { settings } from '../../../app/settings/server';
import { createOrUpdateProtectedRoleAsync } from '../roles/createOrUpdateProtectedRole';

export const upsertPermissions = async (): Promise<void> => {
    /* Implementation Hidden */
};

```