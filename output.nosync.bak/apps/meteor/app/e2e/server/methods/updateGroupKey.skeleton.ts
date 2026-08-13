## File: apps/meteor/app/e2e/server/methods/updateGroupKey.ts

```typescript
import { Subscriptions, Rooms } from '@rocket.chat/models';

import {
	notifyOnSubscriptionChangedById,
	notifyOnSubscriptionChanged,
	notifyOnRoomChangedById,
} from '../../../lib/server/lib/notifyListener';

export async function updateGroupKey(rid: string, uid: string, key: string, callerUserId: string) {
    /* Implementation Hidden */
}

```