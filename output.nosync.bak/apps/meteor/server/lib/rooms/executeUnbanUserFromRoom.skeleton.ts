## File: apps/meteor/server/lib/rooms/executeUnbanUserFromRoom.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import { isBannedSubscription, isInviteSubscription, type IUser } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';

import { notifyOnRoomChangedById, notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { afterUnbanFromRoomCallback } from '../callbacks/afterUnbanFromRoomCallback';

export const executeUnbanUserFromRoom = async function (rid: string, user: IUser, byUser: IUser): Promise<void> {
    /* Implementation Hidden */
};

```