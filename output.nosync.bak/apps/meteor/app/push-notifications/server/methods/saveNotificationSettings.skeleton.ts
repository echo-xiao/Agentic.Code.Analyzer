## File: apps/meteor/app/push-notifications/server/methods/saveNotificationSettings.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';
import { notifyOnSubscriptionChangedById } from '../../../lib/server/lib/notifyListener';
import { getUserNotificationPreference } from '../../../utils/server/getUserNotificationPreference';

const saveAudioNotificationValue = (subId: ISubscription['_id'], value: string) =>
	value === 'default' ? Subscriptions.clearAudioNotificationValueById(subId) : Subscriptions.updateAudioNotificationValueById(subId, value);

export type NotificationFieldType =
	| 'desktopNotifications'
	| 'mobilePushNotifications'
	| 'emailNotifications'
	| 'unreadAlert'
	| 'disableNotifications'
	| 'hideUnreadStatus'
	| 'hideMentionStatus'
	| 'muteGroupMentions'
	| 'audioNotificationValue';
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		saveNotificationSettings(roomId: string, field: NotificationFieldType, value: string): boolean;
		saveAudioNotificationValue(subId: string, value: string): boolean;
	}
}

export const saveNotificationSettingsMethod = async (
	userId: string,
	roomId: string,
	field: NotificationFieldType,
	value: string,
): Promise<boolean> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async saveNotificationSettings(roomId, field, value) {
		methodDeprecationLogger.method('saveNotificationSettings', '9.0.0', '/v1/rooms.saveNotification');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'saveNotificationSettings',
			});
		}
		check(roomId, String);
		check(field, String);
		check(value, String);

		return saveNotificationSettingsMethod(userId, roomId, field, value);
	},

	async saveAudioNotificationValue(rid, value) {
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'saveAudioNotificationValue',
			});
		}

		const subscription = await Subscriptions.findOneByRoomIdAndUserId(rid, userId);
		if (!subscription) {
			throw new Meteor.Error('error-invalid-subscription', 'Invalid subscription', {
				method: 'saveAudioNotificationValue',
			});
		}

		const saveAudioNotificationResponse = await saveAudioNotificationValue(subscription._id, value);
		if (saveAudioNotificationResponse.modifiedCount) {
			void notifyOnSubscriptionChangedById(subscription._id);
		}

		return true;
	},
});

```