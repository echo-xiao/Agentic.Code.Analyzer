## File: apps/meteor/app/threads/server/hooks/aftersavemessage.ts

```typescript
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { callbacks } from '../../../../server/lib/callbacks';
import type { SendMessageOptions } from '../../../../server/lib/messages/sendMessage';
import { notifyOnMessageChange } from '../../../lib/server/lib/notifyListener';
import { updateThreadUsersSubscriptions, getMentions } from '../../../lib/server/lib/notifyUsersOnMessage';
import { sendMessageNotifications } from '../../../lib/server/lib/sendNotificationsOnMessage';
import { settings } from '../../../settings/server';
import { reply } from '../functions';

async function notifyUsersOnReply(message: IMessage, replies: IUser['_id'][]) {
    /* Implementation Hidden */
}

async function metaData(message: IMessage, parentMessage: IMessage, followers: string[]) {
    /* Implementation Hidden */
}

const notification = async (message: IMessage, room: IRoom, replies: string[]) => {
    /* Implementation Hidden */
};

export async function processThreads(message: IMessage, room: IRoom, options?: SendMessageOptions) {
    /* Implementation Hidden */
}

Meteor.startup(() => {
	settings.watch<boolean>('Threads_enabled', (value) => {
		if (!value) {
			callbacks.remove('afterSaveMessage', 'threads-after-save-message');
			return;
		}
		callbacks.add(
			'afterSaveMessage',
			async (message, { room, options }) => {
				return processThreads(message, room, options);
			},
			callbacks.priority.LOW,
			'threads-after-save-message',
		);
	});
});

```