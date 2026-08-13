## File: apps/meteor/app/lib/server/methods/cleanRoomHistory.ts

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { findRoomByIdOrName } from '../../../../server/api/v1/rooms';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { cleanRoomHistory } from '../../../../server/lib/rooms/cleanRoomHistory';
import { canAccessRoomAsync } from '../../../authorization/server';

type CleanRoomHistoryParams = {
	roomId: string;
	latest: Date;
	oldest: Date;
	inclusive?: boolean;
	limit?: number;
	excludePinned?: boolean;
	ignoreDiscussion?: boolean;
	filesOnly?: boolean;
	fromUsers?: string[];
	ignoreThreads?: boolean;
};
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		cleanRoomHistory(data: CleanRoomHistoryParams): number;
	}
}

export const cleanRoomHistoryMethod = async (
	userId: string,
	{
		roomId,
		latest,
		oldest,
		inclusive = true,
		limit,
		excludePinned = false,
		ignoreDiscussion = true,
		filesOnly = false,
		fromUsers = [],
		ignoreThreads,
	}: CleanRoomHistoryParams,
): Promise<number> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async cleanRoomHistory({
		roomId,
		latest,
		oldest,
		inclusive = true,
		limit,
		excludePinned = false,
		ignoreDiscussion = true,
		filesOnly = false,
		fromUsers = [],
		ignoreThreads,
	}) {
		check(roomId, String);
		check(latest, Date);
		check(oldest, Date);
		check(inclusive, Boolean);
		check(limit, Match.Maybe(Number));
		check(excludePinned, Match.Maybe(Boolean));
		check(filesOnly, Match.Maybe(Boolean));
		check(ignoreThreads, Match.Maybe(Boolean));
		check(fromUsers, Match.Maybe([String]));

		const userId = Meteor.userId();

		if (!userId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'cleanRoomHistory' });
		}

		return cleanRoomHistoryMethod(userId, {
			roomId,
			latest,
			oldest,
			inclusive,
			limit,
			excludePinned,
			ignoreDiscussion,
			filesOnly,
			fromUsers,
			ignoreThreads,
		});
	},
});

```