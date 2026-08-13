## File: apps/meteor/server/methods/deleteUser.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { deleteUser } from '../lib/users/deleteUser';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteUser(userId: IUser['_id'], confirmRelinquish?: boolean): boolean;
	}
}

export const executeDeleteUser = async (fromUserId: IUser['_id'], userId: IUser['_id'], confirmRelinquish = false): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteUser(userId, confirmRelinquish = false) {
		methodDeprecationLogger.method('deleteUser', '9.0.0', '/v1/users.delete');
		check(userId, String);

		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', {
				method: 'deleteUser',
			});
		}

		if ((await hasPermissionAsync(uid, 'delete-user')) !== true) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', {
				method: 'deleteUser',
			});
		}

		return executeDeleteUser(uid, userId, confirmRelinquish);
	},
});

```