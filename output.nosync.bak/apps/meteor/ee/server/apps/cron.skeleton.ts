## File: apps/meteor/ee/server/apps/cron.ts

```typescript
import type { ProxiedApp } from '@rocket.chat/apps/dist/server/ProxiedApp';
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import { cronJobs } from '@rocket.chat/cron';
import { Settings, Users } from '@rocket.chat/models';

import { Apps } from './orchestrator';
import { getWorkspaceAccessToken } from '../../../app/cloud/server';
import { i18n } from '../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../server/lib/sendMessagesToAdmins';

const notifyAdminsAboutInvalidApps = async function _notifyAdminsAboutInvalidApps(apps?: ProxiedApp[]) {
    /* Implementation Hidden */
};

const notifyAdminsAboutRenewedApps = async function _notifyAdminsAboutRenewedApps(apps?: ProxiedApp[]) {
    /* Implementation Hidden */
};

const appsUpdateMarketplaceInfo = async function _appsUpdateMarketplaceInfo() {
    /* Implementation Hidden */
};

await cronJobs.add('Apps-Engine:check', '0 4 * * *', async () => appsUpdateMarketplaceInfo());

```