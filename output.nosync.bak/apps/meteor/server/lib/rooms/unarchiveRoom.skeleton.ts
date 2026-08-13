## File: apps/meteor/server/lib/rooms/unarchiveRoom.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IMessage } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';

import { notifyOnRoomChangedById, notifyOnSubscriptionChangedByRoomId } from '../../../app/lib/server/lib/notifyListener';

const BATCH_SIZE = 100_000;

async function getActiveUserIds(userIds: string[]): Promise<Set<string>> {
    /* Implementation Hidden */
}

async function unarchiveSubscriptionsByIds(ids: string[]): Promise<void> {
    /* Implementation Hidden */
}

export const unarchiveRoom = async function (rid: string, user: IMessage['u']): Promise<void> {
    /* Implementation Hidden */
};

```