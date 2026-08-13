## File: apps/meteor/server/methods/resetAvatar.ts

```typescript
import { Upload } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { settings } from '../../app/settings/server';
import { hasPermissionAsync } from '../lib/authorization/hasPermission';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		resetAvatar(userId: IUser['_id']): void;
	}
}

export const resetAvatar = async (fromUserId: IUser['_id'], userId: IUser['_id']): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async resetAvatar(userId) {
		methodDeprecationLogger.method('resetAvatar', '9.0.0', '/v1/users.resetAvatar');
		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'resetAvatar',
			});
		}

		return resetAvatar(uid, userId);
	},
});

DDPRateLimiter.addRule(
	{
		type: 'method',
		name: 'resetAvatar',
		userId() {
			return true;
		},
	},
	1,
	60000,
);

```