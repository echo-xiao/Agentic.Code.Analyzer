## File: apps/meteor/server/publications/messages.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { FindOptions } from 'mongodb';

import { getChannelHistory } from '../../app/lib/server/methods/getChannelHistory';
import { canAccessRoomIdAsync } from '../lib/authorization/canAccessRoom';

type CursorPaginationType = 'UPDATED' | 'DELETED';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'messages/get': (
			rid: IRoom['_id'],
			options: {
				lastUpdate?: Date;
				latestDate?: Date;
				oldestDate?: Date;
				inclusive?: boolean;
				count?: number;
				unreads?: boolean;
				next?: string;
				previous?: string;
				type?: CursorPaginationType;
			},
		) => Promise<
			| {
					updated: IMessage[];
					deleted: IMessage[];
					cursor?: {
						next: string | null;
						previous: string | null;
					};
			  }
			| boolean
			| IMessage[]
			| { messages: IMessage[]; firstUnread?: any; unreadNotLoaded?: number }
		>;
	}
}

export function extractTimestampFromCursor(cursor: string): Date {
    /* Implementation Hidden */
}

export function mountCursorQuery({ next, previous, count }: { next?: string; previous?: string; count: number }): {
	query: { $gt: Date } | { $lt: Date };
	options: FindOptions<IMessage>;
} {
    /* Implementation Hidden */
}

export function mountCursorFromMessage(message: IMessage & { _deletedAt?: Date }, type: 'UPDATED' | 'DELETED'): string {
    /* Implementation Hidden */
}

export function mountNextCursor(
	messages: IMessage[],
	count: number,
	type: CursorPaginationType,
	next?: string,
	previous?: string,
): string | null {
    /* Implementation Hidden */
}

export function mountPreviousCursor(
	messages: IMessage[],
	count: number,
	type: CursorPaginationType,
	next?: string,
	previous?: string,
): string | null {
    /* Implementation Hidden */
}

export async function handleWithoutPagination(rid: IRoom['_id'], lastUpdate: Date) {
    /* Implementation Hidden */
}

export async function handleCursorPagination(
	type: CursorPaginationType,
	rid: IRoom['_id'],
	count: number,
	next?: string,
	previous?: string,
): Promise<{
	updated: IMessage[];
	deleted: IMessage[];
	cursor?: {
		next: string | null;
		previous: string | null;
	};
}> {
    /* Implementation Hidden */
}

export const getMessageHistory = async (
	rid: IRoom['_id'],
	fromId: string,
	{
		lastUpdate,
		latestDate = new Date(),
		oldestDate,
		inclusive = false,
		count = 20,
		unreads = false,
		next,
		previous,
		type,
	}: {
		lastUpdate?: Date;
		latestDate?: Date;
		oldestDate?: Date;
		inclusive?: boolean;
		count?: number;
		unreads?: boolean;
		next?: string;
		previous?: string;
		type?: CursorPaginationType;
	},
): Promise<
	| {
			updated: IMessage[];
			deleted: IMessage[];
			cursor?: {
				next: string | null;
				previous: string | null;
			};
	  }
	| false
	| IMessage[]
	| { messages: IMessage[]; firstUnread?: any; unreadNotLoaded?: number }
> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async 'messages/get'(
		rid,
		{ lastUpdate, latestDate = new Date(), oldestDate, inclusive = false, count = 20, unreads = false, next, previous, type },
	) {
		check(rid, String);

		const fromId = Meteor.userId();

		if (!fromId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'messages/get' });
		}

		if (!rid) {
			throw new Meteor.Error('error-invalid-room', 'Invalid room', { method: 'messages/get' });
		}

		return getMessageHistory(rid, fromId, { lastUpdate, latestDate, oldestDate, inclusive, count, unreads, next, previous, type });
	},
});

```