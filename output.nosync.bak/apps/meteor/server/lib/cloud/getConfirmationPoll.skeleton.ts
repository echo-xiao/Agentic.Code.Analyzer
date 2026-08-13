## File: apps/meteor/server/lib/cloud/getConfirmationPoll.ts

```typescript
import type { CloudConfirmationPollData } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../logger/system';

export async function getConfirmationPoll(deviceCode: string): Promise<CloudConfirmationPollData> {
    /* Implementation Hidden */
}

```