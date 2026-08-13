## File: apps/meteor/app/e2e/server/methods/getUsersOfRoomWithoutKey.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Users } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomIdAsync } from '../../../../server/lib/authorization/canAccessRoom';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'e2e.getUsersOfRoomWithoutKey'(rid: IRoom['_id']): { users: Pick<IUser, '_id' | 'e2e'>[] };
	}
}

export const getUsersOfRoomWithoutKeyMethod = async (
	userId: string,
	rid: IRoom['_id'],
): Promise<{ users: Pick<IUser, '_id' | 'e2e'>[] }> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async 'e2e.getUsersOfRoomWithoutKey'(rid) {
		check(rid, String);

		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'e2e.getUsersOfRoomWithoutKey',
			});
		}

		if (!rid) {
			throw new Meteor.Error('error-invalid-room', 'Invalid room', {
				method: 'e2e.getUsersOfRoomWithoutKey',
			});
		}

		return getUsersOfRoomWithoutKeyMethod(userId, rid);
	},
});

```