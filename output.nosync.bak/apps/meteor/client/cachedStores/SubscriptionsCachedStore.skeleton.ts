## File: apps/meteor/client/cachedStores/SubscriptionsCachedStore.ts

```typescript
import type { IOmnichannelRoom, IRoomWithRetentionPolicy, ISubscription } from '@rocket.chat/core-typings';
import { DEFAULT_SLA_CONFIG, isRoomNativeFederated, LivechatPriorityWeight } from '@rocket.chat/core-typings';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';

import { PrivateCachedStore } from '../lib/cachedStores/CachedStore';
import { Rooms, Subscriptions } from '../stores';

class SubscriptionsCachedStore extends PrivateCachedStore<SubscriptionWithRoom, ISubscription> {
	constructor() {
        /* Implementation Hidden */
    }

	protected override mapRecord(subscription: ISubscription): SubscriptionWithRoom {
        /* Implementation Hidden */
    }

	async upsertSubscription(record: ISubscription): Promise<void> {
        /* Implementation Hidden */
    }

	protected override deserializeFromCache(record: unknown) {
        /* Implementation Hidden */
    }
}

const instance = new SubscriptionsCachedStore();

export { instance as SubscriptionsCachedStore };

```