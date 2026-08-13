## File: ee/packages/media-calls/src/server/signals/getSignalsForExistingCall.ts

```typescript
import type { IMediaCall, IUser } from '@rocket.chat/core-typings';
import type { ServerMediaCallSignal } from '@rocket.chat/media-signaling';

import { getNewCallSignal } from './getNewCallSignal';
import { getCallRoleForUser } from '../getCallRoleForUser';
import { getInitialOfferSignal } from './getInitialOfferSignal';
import { getStateNotification } from './getStateNotification';

export async function getSignalsForExistingCall(call: IMediaCall, uid: IUser['_id'], contractId: string): Promise<ServerMediaCallSignal[]> {
    /* Implementation Hidden */
}

```