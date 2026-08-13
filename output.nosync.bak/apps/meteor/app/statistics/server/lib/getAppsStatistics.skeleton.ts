## File: apps/meteor/app/statistics/server/lib/getAppsStatistics.ts

```typescript
import { Apps } from '@rocket.chat/apps';
import { AppInstallationSource } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';
import { AppStatus, AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import mem from 'mem';

import { SystemLogger } from '../../../../server/lib/logger/system';
import { Info } from '../../../utils/rocketchat.info';

type AppsStatistics = {
	engineVersion: string;
	totalInstalled: number | false;
	totalActive: number | false;
	totalFailed: number | false;
	totalPrivateApps: number | false;
	totalPrivateAppsEnabled: number | false;
};

async function _getAppsStatistics(): Promise<AppsStatistics> {
    /* Implementation Hidden */
}

// since this function is called every 5s by `setPrometheusData` we're memoizing the result since the result won't change that often
export const getAppsStatistics = mem(_getAppsStatistics, { maxAge: 60000 });

```