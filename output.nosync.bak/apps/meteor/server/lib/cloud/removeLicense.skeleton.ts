## File: apps/meteor/server/lib/cloud/removeLicense.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { CloudWorkspaceAccessTokenEmptyError, getWorkspaceAccessToken } from './getWorkspaceAccessToken';
import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { syncWorkspace } from './syncWorkspace';
import { settings } from '../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../lib/errors/CloudWorkspaceConnectionError';
import { CloudWorkspaceRegistrationError } from '../../../lib/errors/CloudWorkspaceRegistrationError';
import { callbacks } from '../callbacks';

export async function removeLicense() {
    /* Implementation Hidden */
}

```