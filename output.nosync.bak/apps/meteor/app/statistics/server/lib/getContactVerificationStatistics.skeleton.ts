## File: apps/meteor/app/statistics/server/lib/getContactVerificationStatistics.ts

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import { LivechatContacts } from '@rocket.chat/models';

import { settings } from '../../../settings/server';

export async function getContactVerificationStatistics(): Promise<IStats['contactVerification']> {
    /* Implementation Hidden */
}

```