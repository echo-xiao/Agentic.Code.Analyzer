## File: apps/meteor/app/statistics/server/functions/sendUsageReport.ts

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import type { Logger } from '@rocket.chat/logger';
import { Statistics } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { tracerSpan } from '@rocket.chat/tracing';
import { Meteor } from 'meteor/meteor';

import { statistics } from '..';
import { shouldReportStatistics } from '../../../../server/cron/usageReport';
import { getWorkspaceAccessToken } from '../../../cloud/server';
import { Info } from '../../../utils/rocketchat.info';

async function sendStats(logger: Logger, cronStatistics: IStats): Promise<string | undefined> {
    /* Implementation Hidden */
}

export async function sendUsageReport(logger: Logger): Promise<string | undefined> {
    /* Implementation Hidden */
}

```