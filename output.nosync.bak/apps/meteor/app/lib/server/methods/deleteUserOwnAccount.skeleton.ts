## File: apps/meteor/app/lib/server/methods/deleteUserOwnAccount.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { SHA256 } from '@rocket.chat/sha256';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { trim } from '../../../../lib/utils/stringUtils';
import { deleteUser } from '../../../../server/lib/users/deleteUser';
import { settings } from '../../../settings/server';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		deleteUserOwnAccount(password: string, confirmRelinquish?: boolean): Promise<boolean>;
	}
}

export const deleteUserOwnAccount = async (fromUserId: string, password: string, confirmRelinquish = false): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async deleteUserOwnAccount(password, confirmRelinquish) {
		methodDeprecationLogger.method('deleteUserOwnAccount', '9.0.0', '/v1/users.deleteOwnAccount');
		check(password, String);

		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'deleteUserOwnAccount',
			});
		}

		return deleteUserOwnAccount(uid, password, confirmRelinquish);
	},
});

```