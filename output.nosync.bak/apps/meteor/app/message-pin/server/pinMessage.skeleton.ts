## File: apps/meteor/app/message-pin/server/pinMessage.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { Message } from '@rocket.chat/core-services';
import { isQuoteAttachment, isRegisterUser } from '@rocket.chat/core-typings';
import type { IMessage, MessageAttachment, MessageQuoteAttachment } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Rooms, Subscriptions, Users } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../server/lib/authorization/hasPermission';
import { isTheLastMessage } from '../../../server/lib/messages/isTheLastMessage';
import { canAccessRoomAsync, roomAccessAttributes } from '../../authorization/server';
import { methodDeprecationLogger } from '../../lib/server/lib/deprecationWarningLogger';
import { notifyOnRoomChangedById, notifyOnMessageChange } from '../../lib/server/lib/notifyListener';
import { settings } from '../../settings/server';
import { getUserAvatarURL } from '../../utils/server/getUserAvatarURL';

const recursiveRemove = (msg: MessageAttachment, deep = 1) => {
    /* Implementation Hidden */
};

const shouldAdd = (attachments: MessageAttachment[], attachment: MessageQuoteAttachment) =>
	!attachments.some((_attachment) => isQuoteAttachment(_attachment) && _attachment.message_link === attachment.message_link);

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		pinMessage(message: IMessage, pinnedAt?: Date): IMessage | null;
		unpinMessage(message: IMessage): boolean;
	}
}

export async function pinMessage(message: IMessage, userId: string, pinnedAt?: Date) {
    /* Implementation Hidden */
}

export const unpinMessage = async (userId: string, message: IMessage) => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async pinMessage(message, pinnedAt) {
		methodDeprecationLogger.method('pinMessage', '9.0.0', '/v1/chat.pinMessage');
		check(message._id, String);

		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'pinMessage',
			});
		}

		return pinMessage(message, userId, pinnedAt);
	},
	async unpinMessage(message) {
		methodDeprecationLogger.method('unpinMessage', '9.0.0', '/v1/chat.unPinMessage');
		check(message._id, String);

		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'unpinMessage',
			});
		}

		return unpinMessage(userId, message);
	},
});

```