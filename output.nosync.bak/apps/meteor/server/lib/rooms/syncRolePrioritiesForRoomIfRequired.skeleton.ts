## File: apps/meteor/server/lib/rooms/syncRolePrioritiesForRoomIfRequired.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';

import { calculateRoomRolePriorityFromRoles } from '../../../lib/roles/calculateRoomRolePriorityFromRoles';

const READ_BATCH_SIZE = 1000;

const SYNC_VERSION = 2;

async function assignRoomRolePrioritiesFromMap(userIdAndRoomRolePrioritiesMap: Map<IUser['_id'], IUser['roomRolePriorities']>) {
    /* Implementation Hidden */
}

export const syncRolePrioritiesForRoomIfRequired = async (rid: IRoom['_id']) => {
    /* Implementation Hidden */
};

```