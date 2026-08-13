## File: packages/ddp-client/src/wrapOnceEventIntoPromise.ts

```typescript
import type { Emitter } from '@rocket.chat/emitter';

/**
 * This function takes an event emitter (an object that emits events) and an event name
 * as arguments, and returns a `Promise` that is resolved when the event is emitted, or
 * is rejected if the event object has an `error` property.
 * @param emitter The event emitter
 * @param event The event name
 * @returns A `Promise` that is resolved when the event is emitted, or is rejected if the event object has an `error` property
 */
export function wrapOnceEventIntoPromise<T extends { error?: string }>(emitter: Emitter, event: string) {
    /* Implementation Hidden */
}

```