## File: apps/meteor/ee/server/methods/getReadReceipts.ts

```typescript
import type { IReadReceiptWithUser, IMessage } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { License } from '@rocket.chat/license';
import { Messages } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { canAccessRoomIdAsync } from '../../../server/lib/authorization/canAccessRoom';
import { ReadReceipt } from '../lib/message-read-receipt/ReadReceipt';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		getReadReceipts(options: { messageId: IMessage['_id'] }): IReadReceiptWithUser[];
	}
}

export const getReadReceiptsFunction = async function (messageId: IMessage['_id'], userId: string): Promise<IReadReceiptWithUser[]> {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async getReadReceipts({ messageId }) {
		check(messageId, String);

		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'getReadReceipts' });
		}

		return getReadReceiptsFunction(messageId, uid);
	},
});

```