## File: apps/meteor/server/lib/cloud/getWorkspaceLicense.ts

```typescript
import { Cloud } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import * as z from 'zod';

import { getWorkspaceAccessToken } from './getWorkspaceAccessToken';
import { LICENSE_VERSION } from '../../../app/cloud/server/license';
import { settings } from '../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../lib/errors/CloudWorkspaceConnectionError';
import { CloudWorkspaceLicenseError } from '../../../lib/errors/CloudWorkspaceLicenseError';
import { callbacks } from '../callbacks';
import { SystemLogger } from '../logger/system';

const fetchCloudWorkspaceLicensePayload = async ({ token }: { token: string }): Promise<Cloud.WorkspaceLicensePayload> => {
    /* Implementation Hidden */
};

export async function getWorkspaceLicense() {
    /* Implementation Hidden */
}

```