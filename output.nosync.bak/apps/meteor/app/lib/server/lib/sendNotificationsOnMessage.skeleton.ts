## File: apps/meteor/app/lib/server/lib/sendNotificationsOnMessage.ts

```typescript
import {
	type IMessage,
	type ISubscription,
	type IUser,
	type IRoom,
	type NotificationItem,
	isEditedMessage,
	type AtLeast,
} from '@rocket.chat/core-typings';
import { Subscriptions, Users } from '@rocket.chat/models';
import emojione from 'emojione';
import moment from 'moment';
import type { RootFilterOperators } from 'mongodb';

import { getMentions } from './notifyUsersOnMessage';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { callbacks } from '../../../../server/lib/callbacks';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { Notification } from '../../../notification-queue/server/NotificationQueue';
import { settings } from '../../../settings/server';
import { parseMessageTextPerUser, replaceMentionedUsernamesWithFullNames } from '../functions/notifications';
import { notifyDesktopUser, shouldNotifyDesktop } from '../functions/notifications/desktop';
import { getEmailData, shouldNotifyEmail } from '../functions/notifications/email';
import { messageContainsHighlight } from '../functions/notifications/messageContainsHighlight';
import { getPushData, shouldNotifyMobile } from '../functions/notifications/mobile';

type SubscriptionAggregation = {
	receiver: [Pick<IUser, 'active' | 'emails' | 'language' | 'status' | 'statusConnection' | 'username' | 'settings'> | null];
} & Pick<
	ISubscription,
	| 'desktopNotifications'
	| 'emailNotifications'
	| 'mobilePushNotifications'
	| 'muteGroupMentions'
	| 'name'
	| 'rid'
	| 'userHighlights'
	| 'u'
	| 'audioNotificationValue'
>;

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
	[Property in Key]-?: Type[Property];
};

export const sendNotification = async ({
	subscription,
	sender,
	hasReplyToThread,
	hasMentionToAll,
	hasMentionToHere,
	message,
	notificationMessage,
	room,
	mentionIds,
	disableAllMessageNotifications,
}: {
	subscription: SubscriptionAggregation;
	sender: Pick<IUser, '_id' | 'name' | 'username'>;

	hasReplyToThread: boolean;
	hasMentionToAll: boolean;
	hasMentionToHere: boolean;
	message: AtLeast<IMessage, '_id' | 'u' | 'msg' | 't' | 'attachments'>;
	notificationMessage: string;
	room: IRoom;
	mentionIds: string[];
	disableAllMessageNotifications: boolean;
}) => {
    /* Implementation Hidden */
};

const project = {
	$project: {
		'desktopNotifications': 1,
		'emailNotifications': 1,
		'mobilePushNotifications': 1,
		'muteGroupMentions': 1,
		'name': 1,
		'rid': 1,
		'userHighlights': 1,
		'u._id': 1,
		'receiver.active': 1,
		'receiver.emails': 1,
		'receiver.language': 1,
		'receiver.status': 1,
		'receiver.statusConnection': 1,
		'receiver.username': 1,
		'receiver.settings.preferences.enableMobileRinging': 1,
		'audioNotificationValue': 1,
	},
} as const;

const filter = {
	$match: {
		'receiver.active': true,
	},
} as const;

const lookup = {
	$lookup: {
		from: 'users',
		localField: 'u._id',
		foreignField: '_id',
		as: 'receiver',
	},
} as const;

export async function sendMessageNotifications(message: IMessage, room: IRoom, usersInThread: string[] = []) {
    /* Implementation Hidden */
}

export async function sendAllNotifications(message: IMessage, room: IRoom) {
    /* Implementation Hidden */
}

settings.watch('Troubleshoot_Disable_Notifications', (value) => {
	if (value) {
		return callbacks.remove('afterSaveMessage', 'sendNotificationsOnMessage');
	}

	callbacks.add(
		'afterSaveMessage',
		(message, { room, options }) => {
			if (options?.skipNotifications) {
				return message;
			}

			return sendAllNotifications(message, room);
		},
		callbacks.priority.LOW,
		'sendNotificationsOnMessage',
	);
});

```