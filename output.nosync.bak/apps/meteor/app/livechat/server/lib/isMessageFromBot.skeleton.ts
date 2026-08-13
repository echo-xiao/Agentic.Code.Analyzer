## File: apps/meteor/app/livechat/server/lib/isMessageFromBot.ts

```typescript
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

export async function isMessageFromBot(message: IMessage): Promise<Pick<IUser, '_id' | 'roles'> | null> {
    /* Implementation Hidden */
}

```