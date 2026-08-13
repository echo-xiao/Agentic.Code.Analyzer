## File: apps/meteor/server/lib/cloud/userLogout.ts

```typescript
import { Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { userLoggedOut } from './userLoggedOut';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../logger/system';

export async function userLogout(userId: string): Promise<string | boolean> {
    /* Implementation Hidden */
}

```