## File: apps/meteor/app/push-notifications/server/lib/PushNotification.ts

```typescript
import type { IMessage, IPushNotificationConfig, IRoom, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { callbacks } from '../../../../server/lib/callbacks';
import { RocketChatAssets } from '../../../assets/server';
import { replaceMentionedUsernamesWithFullNames, parseMessageTextPerUser } from '../../../lib/server/functions/notifications';
import { getPushData } from '../../../lib/server/functions/notifications/mobile';
import { metrics } from '../../../metrics/server';
import { Push } from '../../../push/server';
import { settings } from '../../../settings/server';

type PushNotificationData = {
	rid: string;
	uid: string;
	mid: string;
	roomName: string;
	username: string;
	message: string;
	payload: Record<string, any>;
	badge: number;
	category: string;
};

type GetNotificationConfigParam = PushNotificationData & {
	idOnly: boolean;
};

type NotificationPayload = {
	message: IMessage;
	notification: IPushNotificationConfig;
};

function hash(str: string): number {
    /* Implementation Hidden */
}

class PushNotification {
	getNotificationId(roomId: string): number {
        /* Implementation Hidden */
    }

	private getNotificationConfig({
		rid,
		uid: userId,
		mid: messageId,
		roomName,
		username,
		message,
		payload,
		badge = 1,
		category,
		idOnly = false,
	}: GetNotificationConfigParam): IPushNotificationConfig {
        /* Implementation Hidden */
    }

	async send({ rid, uid, mid, roomName, username, message, payload, badge = 1, category }: PushNotificationData): Promise<void> {
        /* Implementation Hidden */
    }

	async getNotificationForMessageId({
		receiver,
		message,
		room,
	}: {
		receiver: IUser;
		message: IMessage;
		room: IRoom;
	}): Promise<NotificationPayload> {
        /* Implementation Hidden */
    }
}

export default new PushNotification();

```