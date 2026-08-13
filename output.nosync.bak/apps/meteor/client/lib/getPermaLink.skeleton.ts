## File: apps/meteor/client/lib/getPermaLink.ts

```typescript
import type { IMessage, Serialized } from '@rocket.chat/core-typings';

import { getUserId } from './user';

const getMessage = async (msgId: string): Promise<Serialized<IMessage> | null> => {
    /* Implementation Hidden */
};

export const getPermaLink = async (msgId: string): Promise<string> => {
    /* Implementation Hidden */
};

```