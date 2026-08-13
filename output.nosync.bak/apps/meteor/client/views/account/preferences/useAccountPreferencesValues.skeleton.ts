## File: apps/meteor/client/views/account/preferences/useAccountPreferencesValues.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';

export type AccountPreferencesData = {
	language?: string;
	dontAskAgainList?: string[];
	enableAutoAway?: boolean;
	idleTimeLimit?: number;
	desktopNotificationRequireInteraction?: boolean;
	desktopNotifications?: string;
	pushNotifications?: string;
	emailNotificationMode?: string;
	receiveLoginDetectionEmail?: boolean;
	notifyCalendarEvents?: boolean;
	enableMobileRinging?: boolean;
	unreadAlert?: boolean;
	showThreadsInMainChannel?: boolean;
	alsoSendThreadToChannel?: 'default' | 'always' | 'never';
	useEmojis?: boolean;
	convertAsciiEmoji?: boolean;
	autoImageLoad?: boolean;
	saveMobileBandwidth?: boolean;
	collapseMediaByDefault?: boolean;
	hideFlexTab?: boolean;
	sendOnEnter?: 'normal' | 'alternative' | 'desktop';
	highlights?: string;
	newRoomNotification?: string;
	newMessageNotification?: string;
	muteFocusedConversations?: boolean;

	enableNewMessageTemplate?: boolean;
	displayAvatars?: boolean;
	sidebarShowFavorites?: boolean;
	sidebarShowUnread?: boolean;
	sidebarSortby?: string;
	sidebarViewMode?: string;
	sidebarDisplayAvatar?: boolean;
	sidebarGroupByType?: boolean;
	masterVolume?: number;
	notificationsSoundVolume?: number;
	voipRingerVolume?: number;
	desktopNotificationVoiceCalls?: boolean;
};

export const useAccountPreferencesValues = (): AccountPreferencesData => {
    /* Implementation Hidden */
};

```