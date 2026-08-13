## File: apps/meteor/tests/e2e/utils/getUserInfo.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import type { BaseTest } from './test';

export const getUserInfo = async (api: BaseTest['api'], username: string): Promise<IUser | undefined> => {
    /* Implementation Hidden */
};

```