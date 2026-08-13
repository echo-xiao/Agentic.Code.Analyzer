## File: apps/meteor/app/authorization/server/methods/removeUserFromRole.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IRole, IUser } from '@rocket.chat/core-typings';
import { Roles, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { removeUserFromRolesAsync } from '../../../../server/lib/roles/removeUserFromRoles';
import { settings } from '../../../settings/server';

export const removeUserFromRole = async (userId: string, roleId: string, username: IUser['username'], scope?: string): Promise<boolean> => {
    /* Implementation Hidden */
};

```