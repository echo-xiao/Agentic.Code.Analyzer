## File: apps/meteor/server/cron/usageReport.ts

```typescript
import { cronJobs } from '@rocket.chat/cron';
import { AirGappedRestriction } from '@rocket.chat/license';
import type { Logger } from '@rocket.chat/logger';
import { Statistics } from '@rocket.chat/models';

import { sendUsageReport } from '../../app/statistics/server/functions/sendUsageReport';

export const sendUsageReportAndComputeRestriction = async (statsToken?: string) => {
    /* Implementation Hidden */
};

export const shouldReportStatistics = () => process.env.RC_DISABLE_STATISTICS_REPORTING?.toLowerCase() !== 'true';

export async function usageReportCron(logger: Logger): Promise<void> {
    /* Implementation Hidden */
}

```