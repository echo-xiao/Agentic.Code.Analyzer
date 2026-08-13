## File: apps/meteor/server/services/room/hooks/BeforeFederationActions.ts

```typescript
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import type { IRoomNativeFederated, IRoom } from '@rocket.chat/core-typings';

import { throwIfFederationNotEnabled } from '../../federation/utils';

export class FederationActions {
	public static shouldPerformFederationAction(room: IRoom): room is IRoomNativeFederated {
        /* Implementation Hidden */
    }

	public static blockIfRoomFederatedButServiceNotReady(room: IRoom) {
        /* Implementation Hidden */
    }
}

```