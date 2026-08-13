## File: apps/meteor/client/meteor/user.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import { watch } from './watch';
import { userIdStore } from '../lib/user';
import { Users } from '../stores';

export const watchUserId = (): IUser['_id'] | undefined => watch(userIdStore, (state) => state);

export const watchUser = (): IUser | undefined => {
    /* Implementation Hidden */
};

```