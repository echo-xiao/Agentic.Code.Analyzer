## File: apps/meteor/server/lib/sendDirectMessageToUsers.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { executeSendMessage } from '../../app/lib/server/methods/sendMessage';
import { createDirectMessage } from '../methods/createDirectMessage';
import { SystemLogger } from './logger/system';

export async function sendDirectMessageToUsers(
	fromId = 'rocket.cat',
	toIds: string[],
	messageFn: (user: IUser) => string,
): Promise<string[]> {
    /* Implementation Hidden */
}

```