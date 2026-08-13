## File: apps/meteor/server/methods/removeUserFromRoom.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { Message, Team, Room } from '@rocket.chat/core-services';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Rooms, Users, Roles } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomAsync } from '../../app/authorization/server';
import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnRoomChanged, notifyOnSubscriptionChanged } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { RoomMemberActions } from '../../definition/IRoomTypeConfig';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { hasRoleAsync } from '../lib/authorization/hasRole';
import { callbacks } from '../lib/callbacks';
import { afterRemoveFromRoomCallback } from '../lib/callbacks/afterRemoveFromRoomCallback';
import { removeUserFromRolesAsync } from '../lib/roles/removeUserFromRoles';
import { roomCoordinator } from '../lib/rooms/roomCoordinator';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		removeUserFromRoom(data: { rid: string; username: string }): boolean;
	}
}

export const removeUserFromRoomMethod = async (fromId: string, data: { rid: string; username: string }): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async removeUserFromRoom(data) {
		methodDeprecationLogger.method('removeUserFromRoom', '9.0.0', ['/v1/channels.kick', '/v1/groups.kick']);
		check(
			data,
			Match.ObjectIncluding({
				rid: String,
				username: String,
			}),
		);

		const fromId = Meteor.userId();

		if (!fromId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'removeUserFromRoom',
			});
		}

		return removeUserFromRoomMethod(fromId, data);
	},
});

```