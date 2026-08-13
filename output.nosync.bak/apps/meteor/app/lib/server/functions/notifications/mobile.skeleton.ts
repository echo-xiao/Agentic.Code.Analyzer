## File: apps/meteor/app/lib/server/functions/notifications/mobile.js

```typescript
import { Subscriptions } from '@rocket.chat/models';

import { i18n } from '../../../../../server/lib/i18n';
import { isRoomCompatibleWithVideoConfRinging } from '../../../../../server/lib/isRoomCompatibleWithVideoConfRinging';
import { roomCoordinator } from '../../../../../server/lib/rooms/roomCoordinator';
import { settings } from '../../../../settings/server';

const CATEGORY_MESSAGE = 'MESSAGE';
const CATEGORY_MESSAGE_NOREPLY = 'MESSAGE_NOREPLY';

function enableNotificationReplyButton(room, username) {
    /* Implementation Hidden */
}

export async function getPushData({
	room,
	message,
	userId,
	senderUsername,
	senderName,
	notificationMessage,
	receiver,
	shouldOmitMessage = true,
}) {
    /* Implementation Hidden */
}

export function shouldNotifyMobile({
	disableAllMessageNotifications,
	mobilePushNotifications,
	hasMentionToAll,
	isHighlighted,
	hasMentionToUser,
	hasReplyToThread,
	roomType,
	isThread,
	isVideoConf,
	userPreferences,
	roomUids,
}) {
    /* Implementation Hidden */
}

```