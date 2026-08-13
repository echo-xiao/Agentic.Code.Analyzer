## File: apps/meteor/client/lib/mutationEffects/starredMessage.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import { Messages } from '../../stores';
import { getUserId } from '../user';

export const toggleStarredMessage = (message: IMessage, starred: boolean) => {
    /* Implementation Hidden */
};

```