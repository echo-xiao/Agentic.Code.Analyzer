## File: apps/meteor/ee/server/apps/appRequestsCron.ts

```typescript
import { cronJobs } from '@rocket.chat/cron';
import type { ExtendedFetchOptions } from '@rocket.chat/server-fetch';

import { appRequestNotififyForUsers } from './marketplace/appRequestNotifyUsers';
import { Apps } from './orchestrator';
import { getWorkspaceAccessToken } from '../../../app/cloud/server';
import { settings } from '../../../app/settings/server';

const appsNotifyAppRequests = async function _appsNotifyAppRequests() {
    /* Implementation Hidden */
};

await cronJobs.add('Apps-Request-End-Users:notify', '0 */12 * * *', async () => appsNotifyAppRequests());

```