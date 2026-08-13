## File: apps/meteor/server/lib/rooms/cleanRoomHistory.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IRoom } from '@rocket.chat/core-typings';
import { Messages, Rooms, Subscriptions, ReadReceipts, ReadReceiptsArchive } from '@rocket.chat/models';

import { deleteRoom } from './deleteRoom';
import { FileUpload } from '../../../app/file-upload/server';
import { notifyOnRoomChangedById, notifyOnSubscriptionChangedById } from '../../../app/lib/server/lib/notifyListener';
import { NOTIFICATION_ATTACHMENT_COLOR } from '../../../lib/constants';
import { i18n } from '../i18n';

const FILE_CLEANUP_BATCH_SIZE = 1000;

export async function cleanRoomHistory({
	rid = '',
	latest = new Date(),
	oldest = new Date('0001-01-01T00:00:00Z'),
	inclusive = true,
	limit = 0,
	excludePinned = true,
	ignoreDiscussion = true,
	filesOnly = false,
	fromUsers = [],
	ignoreThreads = true,
}: {
	rid?: IRoom['_id'];
	latest?: Date;
	oldest?: Date;
	inclusive?: boolean;
	limit?: number;
	excludePinned?: boolean;
	ignoreDiscussion?: boolean;
	filesOnly?: boolean;
	fromUsers?: string[];
	ignoreThreads?: boolean;
}): Promise<number> {
    /* Implementation Hidden */
}

```