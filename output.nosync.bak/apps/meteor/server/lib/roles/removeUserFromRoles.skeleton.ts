## File: apps/meteor/server/lib/roles/removeUserFromRoles.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import type { IRole, IUser, IRoom } from '@rocket.chat/core-typings';
import { Users, Subscriptions, Roles } from '@rocket.chat/models';

import { syncRoomRolePriorityForUserAndRoom } from './syncRoomRolePriority';
import { validateRoleList } from './validateRoleList';
import { notifyOnSubscriptionChangedByRoomIdAndUserId } from '../../../app/lib/server/lib/notifyListener';

export const removeUserFromRolesAsync = async (userId: IUser['_id'], roles: IRole['_id'][], scope?: IRoom['_id']): Promise<boolean> => {
    /* Implementation Hidden */
};

```