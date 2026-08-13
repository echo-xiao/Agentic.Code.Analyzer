## File: apps/meteor/app/lib/server/functions/notifications/desktop.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IMessage, IRoom, IUser, AtLeast } from '@rocket.chat/core-typings';

import { roomCoordinator } from '../../../../../server/lib/rooms/roomCoordinator';
import { metrics } from '../../../../metrics/server';
import { settings } from '../../../../settings/server';

/**
 * Send notification to user
 *
 * @param {string} userId The user to notify
 * @param {object} user The sender
 * @param {object} room The room send from
 * @param {object} message The message object
 * @param {number} duration Duration of notification
 * @param {string} notificationMessage The message text to send on notification body
 */
export async function notifyDesktopUser({
	userId,
	user,
	message,
	room,
	duration,
	notificationMessage,
	audioNotificationValue,
}: {
	userId: string;
	user: AtLeast<IUser, '_id' | 'name' | 'username'>;
	message: IMessage | Pick<IMessage, 'u'>;
	room: IRoom;
	duration?: number;
	notificationMessage: string;
	audioNotificationValue?: string;
}): Promise<void> {
    /* Implementation Hidden */
}

export function shouldNotifyDesktop({
	disableAllMessageNotifications,
	status,
	statusConnection,
	desktopNotifications,
	hasMentionToAll,
	hasMentionToHere,
	isHighlighted,
	hasMentionToUser,
	hasReplyToThread,
	roomType,
	isThread,
}: {
	disableAllMessageNotifications: boolean;
	status: string;
	statusConnection: string;
	desktopNotifications: string | undefined;
	hasMentionToAll: boolean;
	hasMentionToHere: boolean;
	isHighlighted: boolean;
	hasMentionToUser: boolean;
	hasReplyToThread: boolean;
	roomType: string;
	isThread: boolean;
}): boolean {
    /* Implementation Hidden */
}

```