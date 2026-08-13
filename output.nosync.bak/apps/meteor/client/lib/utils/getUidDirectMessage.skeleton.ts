## File: apps/meteor/client/lib/utils/getUidDirectMessage.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';

export const getUidDirectMessage = (room: Pick<IRoom, 't' | 'uids' | 'usernames'>, uid?: IUser['_id']) => {
    /* Implementation Hidden */
};

```