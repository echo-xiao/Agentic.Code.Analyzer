## File: apps/meteor/server/lib/users/saveUser/setPasswordUpdater.ts

```typescript
import crypto from 'node:crypto';

import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/model-typings';
import bcrypt from 'bcrypt';
import { Accounts } from 'meteor/accounts-base';

const hashPassword = async (password: string) => {
    /* Implementation Hidden */
};

export async function setPasswordUpdater(
	updater: Updater<IUser>,
	newPlaintextPassword: string,
	options: { logout?: boolean } = { logout: true },
) {
    /* Implementation Hidden */
}

```