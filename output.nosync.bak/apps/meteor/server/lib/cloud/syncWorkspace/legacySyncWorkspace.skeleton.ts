## File: apps/meteor/server/lib/cloud/syncWorkspace/legacySyncWorkspace.ts

```typescript
import { Cloud } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import * as z from 'zod';

import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../../lib/errors/CloudWorkspaceConnectionError';
import { CloudWorkspaceRegistrationError } from '../../../../lib/errors/CloudWorkspaceRegistrationError';
import type { WorkspaceRegistrationData } from '../buildRegistrationData';
import { buildWorkspaceRegistrationData } from '../buildRegistrationData';
import { CloudWorkspaceAccessTokenEmptyError, getWorkspaceAccessToken } from '../getWorkspaceAccessToken';
import { getWorkspaceLicense } from '../getWorkspaceLicense';
import { retrieveRegistrationStatus } from '../retrieveRegistrationStatus';
import { handleBannerOnWorkspaceSync, handleNpsOnWorkspaceSync } from './handleCommsSync';

/** @deprecated */
const fetchWorkspaceClientPayload = async ({
	token,
	workspaceRegistrationData,
}: {
	token: string;
	workspaceRegistrationData: WorkspaceRegistrationData<undefined>;
}): Promise<Cloud.WorkspaceSyncPayload | undefined> => {
    /* Implementation Hidden */
};

/** @deprecated */
const consumeWorkspaceSyncPayload = async (result: Cloud.WorkspaceSyncPayload) => {
    /* Implementation Hidden */
};

/** @deprecated */
export async function legacySyncWorkspace() {
    /* Implementation Hidden */
}

```