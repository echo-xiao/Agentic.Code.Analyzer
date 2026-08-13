## File: apps/meteor/server/bridges/webdav/lib/uploadFileToWebdav.ts

```typescript
import type { IWebdavAccount } from '@rocket.chat/core-typings';
import { WebdavAccounts } from '@rocket.chat/models';

import { getWebdavCredentials } from './getWebdavCredentials';
import { WebdavClientAdapter } from './webdavClientAdapter';

export const uploadFileToWebdav = async (accountId: IWebdavAccount['_id'], fileData: string | Buffer, name: string): Promise<void> => {
    /* Implementation Hidden */
};

```