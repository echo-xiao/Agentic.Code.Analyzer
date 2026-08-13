## File: apps/meteor/server/lib/callbacks/beforeCreateRoomCallback.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';

import { Callbacks } from './callbacksBase';

export const beforeCreateRoomCallback =
	Callbacks.create<(data: { owner: IUser; room: Omit<IRoom, '_id' | '_updatedAt'> }) => void>('beforeCreateRoom');

export const prepareCreateRoomCallback =
	Callbacks.create<(data: { type: IRoom['t']; extraData: Partial<IRoom> }) => void>('prepareCreateRoom');

```