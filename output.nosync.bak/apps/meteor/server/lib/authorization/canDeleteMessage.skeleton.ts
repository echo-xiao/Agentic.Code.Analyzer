## File: apps/meteor/server/lib/authorization/canDeleteMessage.ts

```typescript
import type { IUser, IRoom } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';

import { canAccessRoomAsync } from './canAccessRoom';
import { hasPermissionAsync } from './hasPermission';
import { getValue } from '../../../app/settings/server/raw';

const elapsedTime = (ts: Date): number => {
    /* Implementation Hidden */
};

export const canDeleteMessageAsync = async (
	deletingUser: Pick<IUser, '_id' | 'username'>,
	{ u, rid, ts }: { u: Pick<IUser, '_id' | 'username'>; rid: string; ts?: Date },
): Promise<boolean> => {
    /* Implementation Hidden */
};

```