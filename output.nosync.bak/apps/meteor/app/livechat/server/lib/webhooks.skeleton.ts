## File: apps/meteor/app/livechat/server/lib/webhooks.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import type { Response } from '@rocket.chat/server-fetch';

import { webhooksLogger } from './logger';
import { metrics } from '../../../metrics/server';
import { settings } from '../../../settings/server';

const isRetryable = (status: number): boolean => status >= 500 || status === 429;

export async function sendRequest(
	postData: {
		type: string;
		[key: string]: any;
	},
	attempts = 5,
	cb?: (response: Response) => Promise<void>,
) {
    /* Implementation Hidden */
}

```