## File: apps/meteor/server/lib/rooms/deleteRoom.ts

```typescript
import { Messages, Rooms, Subscriptions } from '@rocket.chat/models';

import { FileUpload } from '../../../app/file-upload/server';
import { notifyOnRoomChangedById, notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { callbacks } from '../callbacks';

export const deleteRoom = async function (rid: string): Promise<void> {
    /* Implementation Hidden */
};

```