## File: apps/meteor/server/services/nps/sendNpsResults.ts

```typescript
import type { INpsVote } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { getWorkspaceAccessToken } from '../../../app/cloud/server';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../../lib/logger/system';

type NPSResultPayload = {
	total: number;
	votes: Pick<INpsVote, 'identifier' | 'roles' | 'score' | 'comment'>[];
};

export const sendNpsResults = async function sendNpsResults(npsId: string, data: NPSResultPayload) {
    /* Implementation Hidden */
};

```