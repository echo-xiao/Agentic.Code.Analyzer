## File: apps/meteor/app/mentions/server/methods/getUserMentionsByChannel.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages, Users, Rooms } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomAsync } from '../../../authorization/server';
import { methodDeprecationLogger } from '../../../lib/server/lib/deprecationWarningLogger';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getUserMentionsByChannel(params: { roomId: string; options: { limit: number; skip: number; sort: { ts: -1 | 1 } } }): IMessage[];
	}
}

export const getUserMentionsByChannel = async (
	userId: string,
	roomId: string,
	options: { limit?: number; skip?: number; sort?: { ts?: -1 | 1 } },
) => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async getUserMentionsByChannel({ roomId, options }) {
		methodDeprecationLogger.method('getUserMentionsByChannel', '9.0.0', '/v1/channels.getAllUserMentionsByChannel');
		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'getUserMentionsByChannel',
			});
		}

		return getUserMentionsByChannel(uid, roomId, options);
	},
});

```