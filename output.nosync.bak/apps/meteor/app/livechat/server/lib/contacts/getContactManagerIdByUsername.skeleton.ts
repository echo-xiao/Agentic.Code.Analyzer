## File: apps/meteor/app/livechat/server/lib/contacts/getContactManagerIdByUsername.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

export async function getContactManagerIdByUsername(
	username: Required<IUser>['username'],
	session?: ClientSession,
): Promise<IUser['_id'] | undefined> {
    /* Implementation Hidden */
}

```