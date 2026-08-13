## File: apps/meteor/server/methods/addRoomOwner.ts

```typescript
import { api, Message, Team } from '@rocket.chat/core-services';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Rooms, Users } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { beforeChangeRoomRole } from '../lib/callbacks/beforeChangeRoomRole';
import { syncRoomRolePriorityForUserAndRoom } from '../lib/roles/syncRoomRolePriority';
import { isFederationEnabled, FederationMatrixInvalidConfigurationError } from '../services/federation/utils';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addRoomOwner(rid: IRoom['_id'], userId: IUser['_id']): boolean;
	}
}

export const addRoomOwner = async (fromUserId: IUser['_id'], rid: IRoom['_id'], userId: IUser['_id']): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addRoomOwner(rid, userId) {
		methodDeprecationLogger.method('addRoomOwner', '9.0.0', ['/v1/channels.addOwner', '/v1/groups.addOwner']);
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'addRoomOwner',
			});
		}

		return addRoomOwner(uid, rid, userId);
	},
});

```