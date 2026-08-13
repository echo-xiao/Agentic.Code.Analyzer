## File: apps/meteor/app/lib/server/methods/leaveRoom.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Roles, Subscriptions, Rooms } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { RoomMemberActions } from '../../../../definition/IRoomTypeConfig';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { hasRoleAsync } from '../../../../server/lib/authorization/hasRole';
import { removeUserFromRoom } from '../../../../server/lib/rooms/removeUserFromRoom';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		leaveRoom(rid: string): Promise<void>;
	}
}

export const leaveRoomMethod = async (user: IUser, rid: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async leaveRoom(rid) {
		methodDeprecationLogger.method('leaveRoom', '9.0.0', ['/v1/channels.leave', '/v1/groups.leave', '/v1/im.leave']);
		check(rid, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'leaveRoom' });
		}

		const user = (await Meteor.userAsync()) as unknown as IUser;

		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'leaveRoom' });
		}

		return leaveRoomMethod(user, rid);
	},
});

```