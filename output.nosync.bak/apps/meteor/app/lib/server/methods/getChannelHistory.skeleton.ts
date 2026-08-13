## File: apps/meteor/app/lib/server/methods/getChannelHistory.ts

```typescript
import { Authorization } from '@rocket.chat/core-services';
import type { IMessage, MessageTypesValues } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Rooms } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { settings } from '../../../settings/server/cached';
import { normalizeMessagesForUser } from '../../../utils/server/lib/normalizeMessagesForUser';
import { methodDeprecationLogger } from '../lib/deprecationWarningLogger';
import { getHiddenSystemMessages } from '../lib/getHiddenSystemMessages';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getChannelHistory(params: {
			rid: string;
			latest?: Date;
			oldest?: Date;
			inclusive?: boolean;
			offset?: number;
			count?: number;
			unreads?: boolean;
			showThreadMessages?: boolean;
		}): boolean | IMessage[] | { messages: IMessage[]; firstUnread?: any; unreadNotLoaded?: number };
	}
}

export const getChannelHistory = async ({
	rid,
	fromUserId,
	latest,
	oldest,
	inclusive,
	offset = 0,
	count = 20,
	unreads,
	showThreadMessages = true,
}: {
	rid: string;
	fromUserId: string;
	latest?: Date;
	oldest?: Date;
	inclusive?: boolean;
	offset?: number;
	count?: number;
	unreads?: boolean;
	showThreadMessages?: boolean;
}): Promise<false | IMessage[] | { messages: IMessage[]; firstUnread?: any; unreadNotLoaded?: number }> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async getChannelHistory({ rid, latest, oldest, inclusive, offset = 0, count = 20, unreads, showThreadMessages = true }) {
		methodDeprecationLogger.method('getChannelHistory', '9.0.0', '/v1/channels.history');
		check(rid, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'getChannelHistory' });
		}

		const fromUserId = Meteor.userId();
		if (!fromUserId) {
			return false;
		}

		return getChannelHistory({ rid, fromUserId, latest, oldest, inclusive, offset, count, unreads, showThreadMessages });
	},
});

```