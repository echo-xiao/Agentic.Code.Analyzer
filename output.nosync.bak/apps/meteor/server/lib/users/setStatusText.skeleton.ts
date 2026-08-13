## File: apps/meteor/server/lib/users/setStatusText.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Users } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

import { onceTransactionCommitedSuccessfully } from '../../database/utils';

export async function setStatusText(
	user: Pick<IUser, '_id' | 'username' | 'name' | 'status' | 'roles' | 'statusText'>,
	statusText: string,
	{
		updater,
		session,
		emit = true,
	}: {
		updater?: Updater<IUser>;
		session?: ClientSession;
		emit?: boolean;
	} = {},
): Promise<boolean> {
    /* Implementation Hidden */
}

```