## File: apps/meteor/server/lib/unbanUserFromRoom.ts

```typescript
import { Rooms, Users } from '@rocket.chat/models';

import { hasPermissionAsync } from './authorization/hasPermission';
import { executeUnbanUserFromRoom } from './rooms/executeUnbanUserFromRoom';
import { roomCoordinator } from './rooms/roomCoordinator';
import { canAccessRoomAsync } from '../../app/authorization/server';
import { RoomMemberActions } from '../../definition/IRoomTypeConfig';

export const unbanUserFromRoom = async (fromId: string, data: { rid: string; username: string }): Promise<boolean> => {
    /* Implementation Hidden */
};

```