## File: apps/meteor/app/threads/server/functions.ts

```typescript
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import { Messages, Subscriptions, NotificationQueue } from '@rocket.chat/models';

import { callbacks } from '../../../server/lib/callbacks';
import {
	notifyOnSubscriptionChangedByRoomIdAndUserIds,
	notifyOnSubscriptionChangedByRoomIdAndUserId,
} from '../../lib/server/lib/notifyListener';
import { getMentions, getUserIdsFromHighlights } from '../../lib/server/lib/notifyUsersOnMessage';

export async function reply({ tmid }: { tmid?: string }, message: IMessage, parentMessage: IMessage, followers: string[]) {
    /* Implementation Hidden */
}

export async function follow({ tmid, uid }: { tmid: string; uid: string }) {
    /* Implementation Hidden */
}

export async function unfollow({ tmid, rid, uid }: { tmid: string; rid: string; uid: string }) {
    /* Implementation Hidden */
}

export const readThread = async ({ user, room, tmid }: { user: IUser; room: IRoom; tmid: string }) => {
    /* Implementation Hidden */
};

```