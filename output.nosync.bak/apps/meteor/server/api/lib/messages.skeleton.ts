## File: apps/meteor/server/api/lib/messages.ts

```typescript
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { Rooms, Messages, Users } from '@rocket.chat/models';
import type { FindOptions } from 'mongodb';

import { canAccessRoomAsync } from '../../lib/authorization/canAccessRoom';

export async function findMentionedMessages({
	uid,
	roomId,
	pagination: { offset, count, sort },
}: {
	uid: string;
	roomId: string;
	pagination: { offset: number; count: number; sort: FindOptions<IMessage>['sort'] };
}): Promise<{
	messages: IMessage[];
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findStarredMessages({
	uid,
	roomId,
	pagination: { offset, count, sort },
}: {
	uid: string;
	roomId: string;
	pagination: { offset: number; count: number; sort: FindOptions<IMessage>['sort'] };
}): Promise<{
	messages: IMessage[];
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findDiscussionsFromRoom({
	uid,
	roomId,
	text,
	pagination: { offset, count, sort },
}: {
	uid: string;
	roomId: string;
	text: string;
	pagination: { offset: number; count: number; sort: FindOptions<IMessage>['sort'] };
}): Promise<{
	messages: IMessage[];
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

```