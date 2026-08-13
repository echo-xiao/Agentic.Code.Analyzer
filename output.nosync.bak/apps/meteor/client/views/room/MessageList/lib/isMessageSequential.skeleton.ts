## File: apps/meteor/client/views/room/MessageList/lib/isMessageSequential.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageTypes } from '@rocket.chat/message-types';
import { differenceInSeconds } from 'date-fns';

import { isMessageNewDay } from './isMessageNewDay';

export const isMessageSequential = (current: IMessage, previous: IMessage | undefined, groupingRange: number): boolean => {
    /* Implementation Hidden */
};

```