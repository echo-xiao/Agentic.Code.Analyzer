## File: apps/meteor/server/api/lib/webdav.ts

```typescript
import type { IWebdavAccount } from '@rocket.chat/core-typings';
import { WebdavAccounts } from '@rocket.chat/models';

export async function findWebdavAccountsByUserId({ uid }: { uid: string }): Promise<IWebdavAccount[]> {
    /* Implementation Hidden */
}

```