## File: apps/meteor/app/channel-settings/server/functions/saveRoomReadOnly.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export async function saveRoomReadOnly(
	rid: string,
	readOnly: boolean,
	user: Required<Pick<IUser, '_id' | 'username' | 'name'>>,
	sendMessage = true,
) {
    /* Implementation Hidden */
}

```