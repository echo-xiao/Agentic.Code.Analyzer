## File: apps/meteor/app/lib/server/methods/addUsersToRoom.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { isBannedSubscription, isRoomNativeFederated, type IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { beforeAddUsersToRoom } from '../../../../server/lib/callbacks/beforeAddUserToRoom';
import { i18n } from '../../../../server/lib/i18n';
import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addUsersToRoom(data: { rid: string; users: string[] }): boolean;
	}
}

export const sanitizeUsername = (username: string) => {
    /* Implementation Hidden */
};

export const addUsersToRoomMethod = async (userId: string, data: { rid: string; users: string[] }, user?: IUser): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addUsersToRoom(data) {
		methodDeprecationLogger.method('addUsersToRoom', '9.0.0', ['/v1/channels.invite', '/v1/groups.invite']);
		const uid = Meteor.userId();
		// Validate user and room
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'addUsersToRoom',
			});
		}

		return addUsersToRoomMethod(uid, data, ((await Meteor.userAsync()) as IUser | null) ?? undefined);
	},
});

```