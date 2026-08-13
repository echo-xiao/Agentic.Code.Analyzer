## File: apps/meteor/client/meteor/watch.ts

```typescript
import { Tracker } from 'meteor/tracker';
import type { StoreApi, UseBoundStore } from 'zustand';

/** Adds Meteor Tracker reactivity to a Zustand store lookup */
export const watch = <T, U>(store: UseBoundStore<StoreApi<U>>, fn: (state: U) => T): T => {
    /* Implementation Hidden */
};

```