## File: apps/meteor/server/methods/messageSearch.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Logger } from '@rocket.chat/logger';
import { Messages, Subscriptions, Users } from '@rocket.chat/models';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { methodDeprecationLogger } from '../../app/lib/server/lib/deprecationWarningLogger';
import type { IRawSearchResult } from '../../app/search/server/model/ISearchResult';
import { settings } from '../../app/settings/server';
import { readSecondaryPreferred } from '../database/readSecondaryPreferred';
import { canAccessRoomIdAsync } from '../lib/authorization/canAccessRoom';
import { parseMessageSearchQuery } from '../lib/parseMessageSearchQuery';

const logger = new Logger('MessageSearch');

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		messageSearch(text: string, rid?: string, limit?: number, offset?: number): IRawSearchResult | false;
	}
}

export const messageSearch = async function (
	userId: string,
	text: string,
	rid?: string,
	limit?: number,
	offset?: number,
): Promise<IRawSearchResult | false> {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async messageSearch(text, rid, limit, offset) {
		methodDeprecationLogger.method('messageSearch', '9.0.0', '/v1/chat.search');
		const currentUserId = Meteor.userId();
		if (!currentUserId) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'messageSearch',
			});
		}

		return messageSearch(currentUserId, text, rid, limit, offset);
	},
});

```