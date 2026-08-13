## File: apps/meteor/server/methods/addRoomLeader.ts

```typescript
import { api, Message, Team } from '@rocket.chat/core-services';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Users } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { syncRoomRolePriorityForUserAndRoom } from '../lib/roles/syncRoomRolePriority';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addRoomLeader(rid: IRoom['_id'], userId: IUser['_id']): boolean;
	}
}

export const addRoomLeader = async (fromUserId: IUser['_id'], rid: IRoom['_id'], userId: IUser['_id']): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addRoomLeader(rid, userId) {
		methodDeprecationLogger.method('addRoomLeader', '9.0.0', ['/v1/channels.addLeader', '/v1/groups.addLeader']);
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'addRoomLeader',
			});
		}

		return addRoomLeader(uid, rid, userId);
	},
});

```