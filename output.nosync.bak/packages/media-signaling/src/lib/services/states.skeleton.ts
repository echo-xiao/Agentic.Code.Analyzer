## File: packages/media-signaling/src/lib/services/states.ts

```typescript
import type { CallState } from '../../definition';

/* returns true if the value represents a state in which the underlying service has not been involved yet */
export function isPendingState(state: CallState): boolean {
    /* Implementation Hidden */
}

/* returns true if the value represents a state in which the underlying service is already involved in the call */
export function isBusyState(state: CallState): boolean {
    /* Implementation Hidden */
}

```