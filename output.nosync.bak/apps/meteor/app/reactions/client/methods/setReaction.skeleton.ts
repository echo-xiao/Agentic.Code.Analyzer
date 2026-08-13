## File: apps/meteor/app/reactions/client/methods/setReaction.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { roomCoordinator } from '../../../../client/lib/rooms/roomCoordinator';
import { getUser, getUserId } from '../../../../client/lib/user';
import { Rooms, Subscriptions, Messages } from '../../../../client/stores';
import { emoji } from '../../../emoji/client';

export const runOptimisticSetReaction = (reaction: string, messageId: IMessage['_id']): void => {
    /* Implementation Hidden */
};

```