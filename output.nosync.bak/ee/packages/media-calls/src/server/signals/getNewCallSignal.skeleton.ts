## File: ee/packages/media-calls/src/server/signals/getNewCallSignal.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import type { CallFlag, CallRole, ServerMediaSignalNewCall } from '@rocket.chat/media-signaling';

import { getNewCallTransferredBy } from './getNewCallTransferredBy';

function getCallFlags(call: IMediaCall, role: CallRole): CallFlag[] {
    /* Implementation Hidden */
}

export function getNewCallSignal(call: IMediaCall, role: CallRole): ServerMediaSignalNewCall {
    /* Implementation Hidden */
}

```