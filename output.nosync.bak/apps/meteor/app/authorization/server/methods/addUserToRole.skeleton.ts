## File: apps/meteor/app/authorization/server/methods/addUserToRole.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IRole, IUser } from '@rocket.chat/core-typings';
import { Roles, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { addUserRolesAsync } from '../../../../server/lib/roles/addUserRoles';
import { settings } from '../../../settings/server';

export const addUserToRole = async (userId: string, roleId: string, username: IUser['username'], scope?: string): Promise<boolean> => {
    /* Implementation Hidden */
};

```