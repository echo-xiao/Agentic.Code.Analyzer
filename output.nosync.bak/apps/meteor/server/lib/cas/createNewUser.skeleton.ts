## File: apps/meteor/server/lib/cas/createNewUser.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Rooms, Users } from '@rocket.chat/models';
import { pick } from '@rocket.chat/tools';
import { Accounts } from 'meteor/accounts-base';

import { logger } from './logger';
import { createRoom } from '../rooms/createRoom';

type CASUserOptions = {
	attributes: Record<string, string | undefined>;
	casVersion: number;
	flagEmailAsVerified: boolean;
};

export const createNewUser = async (username: string, { attributes, casVersion, flagEmailAsVerified }: CASUserOptions): Promise<IUser> => {
    /* Implementation Hidden */
};

```