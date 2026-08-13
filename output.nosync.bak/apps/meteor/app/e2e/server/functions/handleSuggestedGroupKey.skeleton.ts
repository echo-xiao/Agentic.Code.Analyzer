## File: apps/meteor/app/e2e/server/functions/handleSuggestedGroupKey.ts

```typescript
import { Rooms, Subscriptions } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnSubscriptionChangedById, notifyOnRoomChangedById } from '../../../lib/server/lib/notifyListener';

export async function handleSuggestedGroupKey(
	handle: 'accept' | 'reject',
	rid: string,
	userId: string | null,
	method: string,
): Promise<void> {
    /* Implementation Hidden */
}

```