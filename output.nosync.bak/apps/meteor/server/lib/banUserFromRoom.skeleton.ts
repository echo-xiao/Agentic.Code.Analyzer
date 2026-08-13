## File: apps/meteor/server/lib/banUserFromRoom.ts

```typescript
import { isBannedSubscription } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users, Roles } from '@rocket.chat/models';

import { hasPermissionAsync } from './authorization/hasPermission';
import { hasRoleAsync } from './authorization/hasRole';
import { banUserFromRoom } from './rooms/banUserFromRoom';
import { roomCoordinator } from './rooms/roomCoordinator';
import { canAccessRoomAsync } from '../../app/authorization/server';
import { RoomMemberActions } from '../../definition/IRoomTypeConfig';

export const banUserFromRoomMethod = async (fromId: string, data: { rid: string; username: string }): Promise<boolean> => {
    /* Implementation Hidden */
};

```