## File: apps/meteor/server/lib/users/blockUser.ts

```typescript
import { Subscriptions, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnSubscriptionChangedByRoomIdAndUserIds } from '../../../app/lib/server/lib/notifyListener';
import { RoomMemberActions } from '../../../definition/IRoomTypeConfig';
import { roomCoordinator } from '../rooms/roomCoordinator';

export const blockUserMethod = async (userId: string, { rid, blocked }: { rid: string; blocked: string }): Promise<void> => {
    /* Implementation Hidden */
};

```