## File: apps/meteor/app/lib/server/methods/getSingleMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Messages } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomIdAsync } from '../../../../server/lib/authorization/canAccessRoom';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getSingleMessage(mid: IMessage['_id']): Promise<IMessage | null>;
	}
}

export const getSingleMessage = async (userId: string, mid: IMessage['_id']): Promise<IMessage | null> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async getSingleMessage(mid) {
		check(mid, String);

		const uid = Meteor.userId();

		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'getSingleMessage' });
		}

		return getSingleMessage(uid, mid);
	},
});

```