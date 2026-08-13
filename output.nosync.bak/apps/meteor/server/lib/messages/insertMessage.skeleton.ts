## File: apps/meteor/server/lib/messages/insertMessage.ts

```typescript
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { Messages, Rooms } from '@rocket.chat/models';

import { parseUrlsInMessage } from './parseUrlsInMessage';
import { validateMessage, prepareMessageObject } from './sendMessage';

// TODO: remove and move to Message.Service
export const insertMessage = async function (
	user: Pick<IUser, '_id' | 'username'>,
	message: IMessage,
	rid: IRoom['_id'],
	upsert = false,
): Promise<IMessage | boolean> {
    /* Implementation Hidden */
};

```