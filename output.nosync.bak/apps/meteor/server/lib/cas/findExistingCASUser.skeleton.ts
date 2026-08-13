## File: apps/meteor/server/lib/cas/findExistingCASUser.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { settings } from '../../../app/settings/server';

export const findExistingCASUser = async (username: string): Promise<IUser | undefined> => {
    /* Implementation Hidden */
};

```