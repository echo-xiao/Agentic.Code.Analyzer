## File: apps/meteor/tests/e2e/fixtures/collections/users.ts

```typescript
import { faker } from '@faker-js/faker';
import type { IUser } from '@rocket.chat/core-typings';

import { DEFAULT_USER_CREDENTIALS } from '../../config/constants';
import type { IUserState } from '../userStates';

type UserFixture = IUser & {
	username: string;
	__rooms: string[];
};

export function createUserFixture(user: IUserState): UserFixture {
    /* Implementation Hidden */
}

```