## File: apps/meteor/server/lib/eraseRoom.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { Message, Team } from '@rocket.chat/core-services';
import type { IRoom, IUser, AtLeast } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from './authorization/hasPermission';
import { deleteRoom } from './rooms/deleteRoom';
import { roomCoordinator } from './rooms/roomCoordinator';

export async function eraseRoom(roomOrId: string | IRoom, user: AtLeast<IUser, '_id' | 'name' | 'username'>): Promise<void> {
    /* Implementation Hidden */
}

```