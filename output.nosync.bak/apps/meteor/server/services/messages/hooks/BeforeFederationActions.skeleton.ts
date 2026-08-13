## File: apps/meteor/server/services/messages/hooks/BeforeFederationActions.ts

```typescript
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import type { AtLeast, IMessage, IRoom } from '@rocket.chat/core-typings';

import { isFederationEnabled } from '../../federation/utils';

export class FederationActions {
	public static shouldPerformAction(_message: IMessage, room: AtLeast<IRoom, 'federated'>): boolean {
        /* Implementation Hidden */
    }
}

```