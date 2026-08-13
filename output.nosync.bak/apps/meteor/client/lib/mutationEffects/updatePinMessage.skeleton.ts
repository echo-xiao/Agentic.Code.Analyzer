## File: apps/meteor/client/lib/mutationEffects/updatePinMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { Messages } from '../../stores';
import { PinMessagesNotAllowed } from '../errors/PinMessagesNotAllowed';

export const updatePinMessage = (message: IMessage, data: Partial<IMessage>) => {
    /* Implementation Hidden */
};

```