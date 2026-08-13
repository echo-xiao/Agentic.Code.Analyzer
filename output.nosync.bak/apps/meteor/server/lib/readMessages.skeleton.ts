## File: apps/meteor/server/lib/readMessages.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { NotificationQueue, Subscriptions } from '@rocket.chat/models';

import { callbacks } from './callbacks';
import { notifyOnSubscriptionChangedByRoomIdAndUserId } from '../../app/lib/server/lib/notifyListener';

export async function readMessages(room: IRoom, uid: IUser['_id'], readThreads: boolean): Promise<void> {
    /* Implementation Hidden */
}

```