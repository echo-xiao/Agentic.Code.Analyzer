## File: apps/meteor/app/e2e/server/functions/resetRoomKey.ts

```typescript
import type { ISubscription, IUser, IRoom } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';
import type { AnyBulkWriteOperation } from 'mongodb';

import { notifyOnRoomChanged, notifyOnSubscriptionChanged } from '../../../lib/server/lib/notifyListener';

export async function resetRoomKey(roomId: string, userId: string, newRoomKey: string, newRoomKeyId: string) {
    /* Implementation Hidden */
}

export function pushToLimit(
	arr: NonNullable<IRoom['usersWaitingForE2EKeys']>,
	item: NonNullable<IRoom['usersWaitingForE2EKeys']>[number],
	limit = 50,
) {
    /* Implementation Hidden */
}

async function writeAndNotify(updateOps: AnyBulkWriteOperation<ISubscription>[], notifySubs: ISubscription[]) {
    /* Implementation Hidden */
}

export function replicateMongoSlice(keyId: string, sub: ISubscription) {
    /* Implementation Hidden */
}

```