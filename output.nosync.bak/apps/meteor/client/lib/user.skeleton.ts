## File: apps/meteor/client/lib/user.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { create } from 'zustand';

import { Users } from '../stores';

/**
 * @private do not consume this store directly -- consume it via UserContext
 */
export const userIdStore = create<IUser['_id'] | undefined>(() => undefined);

export const getUserId = () => userIdStore.getState();

export const getUser = () => {
    /* Implementation Hidden */
};

```