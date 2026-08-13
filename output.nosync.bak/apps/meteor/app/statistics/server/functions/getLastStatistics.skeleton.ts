## File: apps/meteor/app/statistics/server/functions/getLastStatistics.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Statistics } from '@rocket.chat/models';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { statistics } from '../lib/statistics';

export async function getLastStatistics({ userId, refresh }: { userId: IUser['_id']; refresh?: boolean }) {
    /* Implementation Hidden */
}

```