## File: apps/meteor/server/methods/unmuteUserInRoom.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IRoom } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnRoomChangedById } from '../../app/lib/server/lib/notifyListener';
import { RoomMemberActions } from '../../definition/IRoomTypeConfig';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { callbacks } from '../lib/callbacks';
import { roomCoordinator } from '../lib/rooms/roomCoordinator';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		unmuteUserInRoom(data: { rid: IRoom['_id']; username: string }): boolean;
	}
}

export const unmuteUserInRoom = async (fromId: string, data: { rid: IRoom['_id']; username: string }): Promise<boolean> => {
    /* Implementation Hidden */
};

```