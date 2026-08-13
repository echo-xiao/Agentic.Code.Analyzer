## File: apps/meteor/app/message-star/server/starMessage.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Subscriptions, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { isTheLastMessage } from '../../../server/lib/messages/isTheLastMessage';
import { canAccessRoomAsync, roomAccessAttributes } from '../../authorization/server';
import { methodDeprecationLogger } from '../../lib/server/lib/deprecationWarningLogger';
import { notifyOnRoomChangedById, notifyOnMessageChange } from '../../lib/server/lib/notifyListener';
import { settings } from '../../settings/server';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		starMessage(message: Pick<IMessage, 'rid' | '_id'> & { starred: boolean }): boolean;
	}
}

export const starMessage = async (user: IUser, message: Pick<IMessage, 'rid' | '_id'> & { starred: boolean }): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async starMessage(message) {
		methodDeprecationLogger.method('starMessage', '9.0.0', '/v1/chat.starMessage');
		const user = (await Meteor.userAsync()) as IUser;

		if (!user) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'starMessage',
			});
		}

		return starMessage(user, message);
	},
});

```