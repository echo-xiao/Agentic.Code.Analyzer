## File: apps/meteor/server/lib/authorization/canSendMessage.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Subscriptions, Rooms } from '@rocket.chat/models';

import { canAccessRoomAsync } from './canAccessRoom';
import { hasPermissionAsync } from './hasPermission';
import { RoomMemberActions } from '../../../definition/IRoomTypeConfig';
import { roomCoordinator } from '../rooms/roomCoordinator';

const subscriptionOptions = {
	projection: {
		blocked: 1,
		blocker: 1,
	},
};

// TODO: remove option uid and username and type
export async function validateRoomMessagePermissionsAsync(
	room: IRoom | null,
	args: { uid: IUser['_id']; username: IUser['username']; type: IUser['type'] } | IUser,
	extraData?: Record<string, any>,
): Promise<void> {
    /* Implementation Hidden */
}
// TODO: remove option uid and username and type
export async function canSendMessageAsync(
	rid: IRoom['_id'],
	user: { uid: IUser['_id']; username: IUser['username']; type: IUser['type'] } | IUser,
	extraData?: Record<string, any>,
): Promise<IRoom> {
    /* Implementation Hidden */
}

```