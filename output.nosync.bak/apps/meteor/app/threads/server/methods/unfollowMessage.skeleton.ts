## File: apps/meteor/app/threads/server/methods/unfollowMessage.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomIdAsync } from '../../../../server/lib/authorization/canAccessRoom';
import { RateLimiter } from '../../../lib/server';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnMessageChange } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { unfollow } from '../functions';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		unfollowMessage(message: { mid: IMessage['_id'] }): false | undefined;
	}
}

export const unfollowMessage = async (user: IUser, { mid }: { mid: IMessage['_id'] }): Promise<false | undefined> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async unfollowMessage({ mid }) {
		methodDeprecationLogger.method('unfollowMessage', '9.0.0', '/v1/chat.unfollowMessage');
		check(mid, String);

		const user = (await Meteor.userAsync()) as IUser;
		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'unfollowMessage' });
		}

		return unfollowMessage(user, { mid });
	},
});

RateLimiter.limitMethod('unfollowMessage', 5, 5000, {
	userId() {
		return true;
	},
});

```