## File: apps/meteor/client/lib/chats/flows/afterSendMessageCallback.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { clientCallbacks } from '@rocket.chat/ui-client';

import { Rooms } from '../../../stores';
import { getUser } from '../../user';

export const afterSendMessageCallback = async (message: IMessage, rid: string) => {
    /* Implementation Hidden */
};

```