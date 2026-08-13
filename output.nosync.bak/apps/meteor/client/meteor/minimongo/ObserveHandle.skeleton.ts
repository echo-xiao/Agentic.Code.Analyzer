## File: apps/meteor/client/meteor/minimongo/ObserveHandle.ts

```typescript
import { Tracker } from 'meteor/tracker';

import type { LocalCollection } from './LocalCollection';
import type { Query } from './queries';

export class ObserveHandle<T extends { _id: string }> {
	isReady: boolean;

	isReadyPromise: Promise<void>;

	constructor(public collection: LocalCollection<T>) {
        /* Implementation Hidden */
    }

	stop() {
        /* Implementation Hidden */
    }
}

export class ReactiveObserveHandle<T extends { _id: string }> extends ObserveHandle<T> {
	constructor(
		private query: Query<T>,
		collection: LocalCollection<T>,
	) {
        /* Implementation Hidden */
    }

	override stop() {
        /* Implementation Hidden */
    }
}

```