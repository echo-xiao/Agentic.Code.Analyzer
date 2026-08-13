## File: apps/meteor/server/lib/cloud/syncWorkspace/fetchWorkspaceSyncPayload.ts

```typescript
import { Cloud } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import * as z from 'zod';

import { settings } from '../../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../../lib/errors/CloudWorkspaceConnectionError';

export async function fetchWorkspaceSyncPayload({
	token,
	data,
}: {
	token: string;
	data: Cloud.WorkspaceSyncRequestPayload;
}): Promise<Cloud.WorkspaceSyncResponse> {
    /* Implementation Hidden */
}

```