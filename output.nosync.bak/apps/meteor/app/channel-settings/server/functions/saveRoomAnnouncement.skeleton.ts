## File: apps/meteor/app/channel-settings/server/functions/saveRoomAnnouncement.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { UpdateResult } from 'mongodb';

export const saveRoomAnnouncement = async function (
	rid: string,
	roomAnnouncement: string,
	user: IUser,
	sendMessage = true,
): Promise<UpdateResult> {
    /* Implementation Hidden */
};

```