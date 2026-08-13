## File: ee/packages/media-calls/src/server/signals/getInitialOfferSignal.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import type { CallRole, ServerMediaSignalRemoteSDP } from '@rocket.chat/media-signaling';
import { MediaCallNegotiations } from '@rocket.chat/models';

export async function getInitialOfferSignal(call: IMediaCall, role: CallRole): Promise<ServerMediaSignalRemoteSDP | null> {
    /* Implementation Hidden */
}

```