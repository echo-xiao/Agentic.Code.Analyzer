## File: apps/meteor/server/lib/rooms/archiveRoom.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IMessage } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions } from '@rocket.chat/models';

import { notifyOnRoomChanged, notifyOnSubscriptionChangedByRoomId } from '../../../app/lib/server/lib/notifyListener';
import { callbacks } from '../callbacks';

export const archiveRoom = async function (rid: string, user: IMessage['u']): Promise<void> {
    /* Implementation Hidden */
};

```