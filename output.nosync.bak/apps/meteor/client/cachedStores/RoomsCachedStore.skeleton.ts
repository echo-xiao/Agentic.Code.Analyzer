## File: apps/meteor/client/cachedStores/RoomsCachedStore.ts

```typescript
import type { IOmnichannelRoom, IRoom, IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';
import { DEFAULT_SLA_CONFIG, isRoomNativeFederated, LivechatPriorityWeight } from '@rocket.chat/core-typings';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';

import { PrivateCachedStore } from '../lib/cachedStores/CachedStore';
import { Rooms, Subscriptions } from '../stores';

class RoomsCachedStore extends PrivateCachedStore<IRoom> {
	constructor() {
        /* Implementation Hidden */
    }

	private merge(room: IRoom, sub: SubscriptionWithRoom): SubscriptionWithRoom {
        /* Implementation Hidden */
    }

	protected override handleLoadedFromServer(rooms: IRoom[]): void {
        /* Implementation Hidden */
    }

	protected override async handleRecordEvent(action: 'removed' | 'changed', room: IRoom) {
        /* Implementation Hidden */
    }

	protected override handleSyncEvent(action: 'removed' | 'changed', room: IRoom): void {
        /* Implementation Hidden */
    }

	protected override deserializeFromCache(record: unknown) {
        /* Implementation Hidden */
    }
}

const instance = new RoomsCachedStore();

export { instance as RoomsCachedStore };

```