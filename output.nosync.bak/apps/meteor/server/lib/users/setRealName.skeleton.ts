## File: apps/meteor/server/lib/users/setRealName.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Users } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

import { settings } from '../../../app/settings/server';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';

export const setRealName = async function (
	userId: string,
	name: string,
	fullUser?: IUser,
	updater?: Updater<IUser>,
	session?: ClientSession,
): Promise<IUser | undefined> {
    /* Implementation Hidden */
};

```