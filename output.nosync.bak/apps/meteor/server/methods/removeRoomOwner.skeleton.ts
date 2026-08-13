## File: apps/meteor/server/methods/removeRoomOwner.ts

```typescript
import { api, Message, Team } from '@rocket.chat/core-services';
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Rooms, Users, Roles } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { beforeChangeRoomRole } from '../lib/callbacks/beforeChangeRoomRole';
import { syncRoomRolePriorityForUserAndRoom } from '../lib/roles/syncRoomRolePriority';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		removeRoomOwner(rid: string, userId: string): boolean;
	}
}

export const removeRoomOwner = async (fromUserId: string, rid: string, userId: string): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async removeRoomOwner(rid, userId) {
		methodDeprecationLogger.method('removeRoomOwner', '9.0.0', ['/v1/channels.removeOwner', '/v1/groups.removeOwner']);
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'removeRoomOwner',
			});
		}

		return removeRoomOwner(uid, rid, userId);
	},
});

```