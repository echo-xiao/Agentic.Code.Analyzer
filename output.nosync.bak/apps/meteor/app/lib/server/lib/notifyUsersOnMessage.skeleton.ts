## File: apps/meteor/app/lib/server/lib/notifyUsersOnMessage.ts

```typescript
import type { IMessage, IRoom, IUser, RoomType } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Subscriptions, Rooms } from '@rocket.chat/models';
import moment from 'moment';

import {
	notifyOnSubscriptionChanged,
	notifyOnSubscriptionChangedByRoomIdAndUserId,
	notifyOnSubscriptionChangedByRoomIdAndUserIds,
} from './notifyListener';
import { callbacks } from '../../../../server/lib/callbacks';
import { settings } from '../../../settings/server';
import { messageContainsHighlight } from '../functions/notifications/messageContainsHighlight';

export async function getMentions(message: IMessage): Promise<{ toAll: boolean; toHere: boolean; mentionIds: string[] }> {
    /* Implementation Hidden */
}

type UnreadCountType = 'all_messages' | 'user_mentions_only' | 'group_mentions_only' | 'user_and_group_mentions_only';

const getGroupMentions = (roomType: RoomType, unreadCount: Exclude<UnreadCountType, 'user_mentions_only'>): number => {
    /* Implementation Hidden */
};

const getUserMentions = (roomType: RoomType, unreadCount: Exclude<UnreadCountType, 'group_mentions_only'>): number => {
    /* Implementation Hidden */
};

export const getUserIdsFromHighlights = async (rid: IRoom['_id'], message: IMessage): Promise<string[]> => {
    /* Implementation Hidden */
};

const getUnreadSettingCount = (roomType: RoomType): UnreadCountType => {
    /* Implementation Hidden */
};

async function updateUsersSubscriptions(message: IMessage, room: IRoom): Promise<void> {
    /* Implementation Hidden */
}

export async function updateThreadUsersSubscriptions(message: IMessage, replies: IUser['_id'][]): Promise<void> {
    /* Implementation Hidden */
}

export async function notifyUsersOnMessage(message: IMessage, room: IRoom, roomUpdater: Updater<IRoom>): Promise<IMessage> {
    /* Implementation Hidden */
}

export async function notifyUsersOnSystemMessage(message: IMessage, room: IRoom): Promise<IMessage> {
    /* Implementation Hidden */
}

callbacks.add(
	'afterSaveMessage',
	async (message, { room, roomUpdater }) => {
		if (!roomUpdater) {
			return message;
		}

		await notifyUsersOnMessage(message, room, roomUpdater);

		return message;
	},
	callbacks.priority.MEDIUM,
	'notifyUsersOnMessage',
);

```