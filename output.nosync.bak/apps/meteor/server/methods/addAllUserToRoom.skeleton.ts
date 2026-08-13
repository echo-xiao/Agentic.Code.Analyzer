## File: apps/meteor/server/methods/addAllUserToRoom.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IRoom } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Rooms, Users } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { beforeAddUserToRoom } from '../../app/lib/server/lib/beforeAddUserToRoom';
import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../app/lib/server/lib/notifyListener';
import { settings } from '../../app/settings/server';
import { getDefaultSubscriptionPref } from '../../app/utils/lib/getDefaultSubscriptionPref';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { callbacks } from '../lib/callbacks';
import { getSubscriptionAutotranslateDefaultConfig } from '../lib/getSubscriptionAutotranslateDefaultConfig';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		addAllUserToRoom(rid: IRoom['_id'], activeUsersOnly?: boolean): Promise<true>;
	}
}

export const addAllUserToRoomFn = async (userId: string, rid: IRoom['_id'], activeUsersOnly = false): Promise<true> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async addAllUserToRoom(rid, activeUsersOnly = false) {
		methodDeprecationLogger.method('addAllUserToRoom', '9.0.0', ['/v1/channels.addAll', '/v1/groups.addAll']);
		if (!this.userId) {
			throw new Meteor.Error(403, 'Access to Method Forbidden', {
				method: 'addAllToRoom',
			});
		}

		return addAllUserToRoomFn(this.userId, rid, activeUsersOnly);
	},
});

```