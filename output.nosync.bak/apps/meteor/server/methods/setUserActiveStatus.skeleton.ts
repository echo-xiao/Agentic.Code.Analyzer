## File: apps/meteor/server/methods/setUserActiveStatus.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../lib/authorization/hasPermission';
import { setUserActiveStatus } from '../lib/users/setUserActiveStatus';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		setUserActiveStatus(userId: string, active: boolean, confirmRelinquish?: boolean): boolean;
	}
}

export const executeSetUserActiveStatus = async (
	fromUserId: string,
	userId: string,
	active: boolean,
	confirmRelinquish?: boolean,
): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async setUserActiveStatus(userId, active, confirmRelinquish) {
		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'setUserActiveStatus',
			});
		}

		return executeSetUserActiveStatus(uid, userId, active, confirmRelinquish);
	},
});

```