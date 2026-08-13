## File: apps/meteor/app/message-mark-as-unread/server/unreadMessages.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Subscriptions } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import logger from './logger';
import { methodDeprecationLogger } from '../../lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedByRoomIdAndUserId } from '../../lib/server/lib/notifyListener';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		unreadMessages(firstUnreadMessage?: Pick<IMessage, '_id'>, room?: IRoom['_id']): void;
	}
}

export const unreadMessages = async (userId: string, firstUnreadMessage?: Pick<IMessage, '_id'>, room?: IRoom['_id']): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async unreadMessages(firstUnreadMessage, room) {
		methodDeprecationLogger.method('unreadMessages', '9.0.0', '/v1/subscriptions.unread');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'unreadMessages',
			});
		}

		return unreadMessages(userId, firstUnreadMessage, room);
	},
});

```