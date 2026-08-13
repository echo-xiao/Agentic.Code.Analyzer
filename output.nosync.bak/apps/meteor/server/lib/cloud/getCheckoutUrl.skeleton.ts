## File: apps/meteor/server/lib/cloud/getCheckoutUrl.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { getWorkspaceAccessTokenOrThrow } from './getWorkspaceAccessToken';
import { syncWorkspace } from './syncWorkspace';
import { settings } from '../../../app/settings/server';
import { getURL } from '../../../app/utils/server/getURL';
import { SystemLogger } from '../logger/system';

export const fallback = 'https://go.rocket.chat/i/contact-sales';

export const getCheckoutUrl = async (): Promise<{
	url: string;
}> => {
    /* Implementation Hidden */
};

```