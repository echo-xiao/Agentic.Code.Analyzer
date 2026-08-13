## File: apps/meteor/server/lib/cloud/syncWorkspace/announcementSync.ts

```typescript
import { Cloud } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import * as z from 'zod';

import { settings } from '../../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../../lib/errors/CloudWorkspaceConnectionError';
import { CloudWorkspaceRegistrationError } from '../../../../lib/errors/CloudWorkspaceRegistrationError';
import { SystemLogger } from '../../logger/system';
import { buildWorkspaceRegistrationData } from '../buildRegistrationData';
import { CloudWorkspaceAccessTokenEmptyError, getWorkspaceAccessToken } from '../getWorkspaceAccessToken';
import { retrieveRegistrationStatus } from '../retrieveRegistrationStatus';
import { handleAnnouncementsOnWorkspaceSync, handleNpsOnWorkspaceSync } from './handleCommsSync';

const fetchCloudAnnouncementsSync = async ({
	token,
	data,
}: {
	token: string;
	data: Cloud.WorkspaceSyncRequestPayload;
}): Promise<Cloud.WorkspaceCommsResponsePayload> => {
    /* Implementation Hidden */
};

export async function announcementSync() {
    /* Implementation Hidden */
}

```