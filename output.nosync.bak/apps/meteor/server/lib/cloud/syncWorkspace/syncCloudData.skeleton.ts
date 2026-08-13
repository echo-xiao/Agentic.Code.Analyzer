## File: apps/meteor/server/lib/cloud/syncWorkspace/syncCloudData.ts

```typescript
import { DuplicatedLicenseError } from '@rocket.chat/license';
import { Settings } from '@rocket.chat/models';

import { fetchWorkspaceSyncPayload } from './fetchWorkspaceSyncPayload';
import { CloudWorkspaceAccessError } from '../../../../lib/errors/CloudWorkspaceAccessError';
import { CloudWorkspaceRegistrationError } from '../../../../lib/errors/CloudWorkspaceRegistrationError';
import { callbacks } from '../../callbacks';
import { SystemLogger } from '../../logger/system';
import { buildWorkspaceRegistrationData } from '../buildRegistrationData';
import { CloudWorkspaceAccessTokenEmptyError, getWorkspaceAccessToken } from '../getWorkspaceAccessToken';
import { retrieveRegistrationStatus } from '../retrieveRegistrationStatus';

export async function syncCloudData() {
    /* Implementation Hidden */
}

```