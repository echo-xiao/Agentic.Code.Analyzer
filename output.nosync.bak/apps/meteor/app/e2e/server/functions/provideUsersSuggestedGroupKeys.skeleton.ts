## File: apps/meteor/app/e2e/server/functions/provideUsersSuggestedGroupKeys.ts

```typescript
import type { IRoom, IUser, ISubscription } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions } from '@rocket.chat/models';

import { canAccessRoomIdAsync } from '../../../../server/lib/authorization/canAccessRoom';
import { notifyOnSubscriptionChanged, notifyOnRoomChangedById } from '../../../lib/server/lib/notifyListener';

export const provideUsersSuggestedGroupKeys = async (
	userId: IUser['_id'],
	usersSuggestedGroupKeys: Record<IRoom['_id'], { _id: IUser['_id']; key: string; oldKeys?: ISubscription['oldRoomKeys'] }[]>,
) => {
    /* Implementation Hidden */
};

const parseOldKeysDates = (oldKeys: ISubscription['oldRoomKeys']) => {
    /* Implementation Hidden */
};

```