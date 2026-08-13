## File: ee/packages/media-calls/src/server/signals/getStateNotification.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import { isPendingState } from '@rocket.chat/media-signaling';
import type { CallFeature, CallNotification, CallRole, ServerMediaSignalNotification } from '@rocket.chat/media-signaling';

function getStateForNotification(call: IMediaCall): CallNotification | null {
    /* Implementation Hidden */
}

export function getStateNotification(call: IMediaCall, role: CallRole): ServerMediaSignalNotification | null {
    /* Implementation Hidden */
}

```