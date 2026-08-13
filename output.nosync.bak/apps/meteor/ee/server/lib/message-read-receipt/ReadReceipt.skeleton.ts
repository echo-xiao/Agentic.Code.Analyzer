## File: apps/meteor/ee/server/lib/message-read-receipt/ReadReceipt.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IMessage, IRoom, IUser, IReadReceipt, IReadReceiptWithUser } from '@rocket.chat/core-typings';
import { LivechatVisitors, ReadReceipts, ReadReceiptsArchive, Messages, Rooms, Subscriptions, Users } from '@rocket.chat/models';

import { notifyOnRoomChangedById, notifyOnMessageChange } from '../../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../../app/settings/server';
import { SystemLogger } from '../../../../server/lib/logger/system';

// debounced function by roomId, so multiple calls within 2 seconds to same roomId runs only once
const list: Record<string, NodeJS.Timeout> = {};
const debounceByRoomId = function (fn: (room: IRoom) => Promise<void>) {
    /* Implementation Hidden */
};

const updateMessages = debounceByRoomId(async ({ _id, lm }: IRoom) => {
	// @TODO maybe store firstSubscription in room object so we don't need to call the above update method
	const firstSubscription = await Subscriptions.getMinimumLastSeenByRoomId(_id);
	if (!firstSubscription?.ls) {
		return;
	}

	const result = await Messages.setVisibleMessagesAsRead(_id, firstSubscription.ls);
	if (result.modifiedCount > 0) {
		void api.broadcast('notify.messagesRead', { rid: _id, until: firstSubscription.ls });
	}

	if (lm && lm <= firstSubscription.ls) {
		await Rooms.setLastMessageAsRead(_id);
		void notifyOnRoomChangedById(_id);
	}
});

class ReadReceiptClass {
	async markMessagesAsRead(roomId: string, userId: string, userLastSeen: Date) {
        /* Implementation Hidden */
    }

	async markMessageAsReadBySender(message: IMessage, { _id: roomId }: { _id: string }, userId: string) {
        /* Implementation Hidden */
    }

	async storeThreadMessagesReadReceipts(tmid: string, userId: string, userLastSeen: Date) {
        /* Implementation Hidden */
    }

	private async storeReadReceipts(
		getMessages: () => Promise<Pick<IMessage, '_id' | 't' | 'pinned' | 'drid' | 'tmid'>[]>,
		roomId: string,
		userId: string,
	) {
        /* Implementation Hidden */
    }

	async getReceipts(message: Pick<IMessage, '_id' | 'receiptsArchived'>): Promise<IReadReceiptWithUser[]> {
        /* Implementation Hidden */
    }
}

export const ReadReceipt = new ReadReceiptClass();

```