## File: apps/meteor/server/methods/ignoreUser.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../app/lib/server/lib/notifyListener';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		ignoreUser(params: { rid: string; userId: string; ignore?: boolean }): boolean;
	}
}

export const ignoreUser = async (
	fromUserId: string,
	{ rid, userId: ignoredUser, ignore }: { rid: string; userId: string; ignore?: boolean },
): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async ignoreUser({ rid, userId: ignoredUser, ignore = true }) {
		methodDeprecationLogger.method('ignoreUser', '9.0.0', '/v1/chat.ignoreUser');
		check(ignoredUser, String);
		check(rid, String);
		check(ignore, Boolean);

		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'ignoreUser',
			});
		}

		return ignoreUser(userId, { rid, userId: ignoredUser, ignore });
	},
});

```