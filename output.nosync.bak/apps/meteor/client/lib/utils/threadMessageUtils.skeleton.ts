## File: apps/meteor/client/lib/utils/threadMessageUtils.ts

```typescript
import type { IMessage, IThreadMessage, MessageAttachment } from '@rocket.chat/core-typings';
import { createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import type { QueryClient } from '@tanstack/react-query';
import type { Condition, Filter } from 'mongodb';

import { queryClient as defaultQueryClient } from '../queryClient';
import { roomsQueryKeys } from '../queryKeys';

export type NotifyRoomRidDeleteBulkEvent = {
	rid: IMessage['rid'];
	excludePinned: boolean;
	ignoreDiscussion: boolean;
	ts: Condition<Date>;
	users: string[];
	ids?: string[];
	showDeletedStatus?: boolean;
} & (
	| {
			filesOnly: true;
			replaceFileAttachmentsWith?: MessageAttachment;
	  }
	| {
			filesOnly?: false;
	  }
);

export const createDeleteCriteria = (params: NotifyRoomRidDeleteBulkEvent): ((message: IMessage) => boolean) => {
    /* Implementation Hidden */
};

export const upsertThreadMessageInCache = (
	message: IMessage,
	rid: IMessage['rid'],
	tmid: IMessage['_id'],
	client: QueryClient = defaultQueryClient,
): void => {
    /* Implementation Hidden */
};

export const markThreadMessagesAsRead = (messages: IThreadMessage[], until?: Date): IThreadMessage[] => {
    /* Implementation Hidden */
};

export const mergeThreadMessages = (cachedMessages: IThreadMessage[], fetchedMessages: IThreadMessage[]): IThreadMessage[] => {
    /* Implementation Hidden */
};

```