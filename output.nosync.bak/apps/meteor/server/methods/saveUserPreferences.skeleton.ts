## File: apps/meteor/server/methods/saveUserPreferences.ts

```typescript
import type { ISubscription, ThemePreference } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Subscriptions, Users } from '@rocket.chat/models';
import type { FontSize } from '@rocket.chat/rest-typings';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import {
	notifyOnSubscriptionChangedByAutoTranslateAndUserId,
	notifyOnSubscriptionChangedByUserId,
	notifyOnSubscriptionChangedByUserPreferences,
	notifyOnUserChange,
} from '../../app/lib/server/lib/notifyListener';
import { settings as rcSettings } from '../../app/settings/server';

type UserPreferences = {
	language: string;
	newRoomNotification: string;
	newMessageNotification: string;
	clockMode: number;
	useEmojis: boolean;
	convertAsciiEmoji: boolean;
	saveMobileBandwidth: boolean;
	collapseMediaByDefault: boolean;
	autoImageLoad: boolean;
	emailNotificationMode: string;
	unreadAlert: boolean;
	masterVolume: number;
	notificationsSoundVolume: number;
	voipRingerVolume: number;
	desktopNotifications: string;
	pushNotifications: string;
	enableAutoAway: boolean;
	highlights: string[];
	hideUsernames: boolean;
	hideRoles: boolean;
	displayAvatars: boolean;
	hideFlexTab: boolean;
	sendOnEnter: string;
	idleTimeLimit: number;
	sidebarShowFavorites: boolean;
	sidebarShowUnread: boolean;
	sidebarSortby: string;
	sidebarViewMode: string;
	sidebarDisplayAvatar: boolean;
	sidebarGroupByType: boolean;
	muteFocusedConversations: boolean;
	dontAskAgainList: { action: string; label: string }[];
	themeAppearence: ThemePreference;
	fontSize?: FontSize;
	receiveLoginDetectionEmail: boolean;
	notifyCalendarEvents: boolean;
	enableMobileRinging: boolean;
	mentionsWithSymbol?: boolean;
	utcOffset?: number;
};

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		saveUserPreferences(preferences: Partial<UserPreferences>): boolean;
	}
}

async function updateNotificationPreferences(
	userId: ISubscription['u']['_id'],
	setting: keyof ISubscription,
	newValue: string,
	oldValue: string,
	preferenceType: keyof ISubscription,
) {
    /* Implementation Hidden */
}

export const saveUserPreferences = async (settings: Partial<UserPreferences>, userId: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async saveUserPreferences(settings) {
		methodDeprecationLogger.method('saveUserPreferences', '9.0.0', '/v1/users.setPreferences');
		const userId = Meteor.userId();
		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'saveUserPreferences' });
		}

		await saveUserPreferences(settings, userId);

		return true;
	},
});

```