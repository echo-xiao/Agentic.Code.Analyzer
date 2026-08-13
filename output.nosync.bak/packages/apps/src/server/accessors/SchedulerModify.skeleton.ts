## File: packages/apps/src/server/accessors/SchedulerModify.ts

```typescript
import type { ISchedulerModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { IOnetimeSchedule, IRecurringSchedule } from '@rocket.chat/apps-engine/definition/scheduler';

import type { SchedulerBridge } from '../bridges';

function createProcessorId(jobId: string, appId: string): string {
    /* Implementation Hidden */
}

export class SchedulerModify implements ISchedulerModify {
	constructor(
		private readonly bridge: SchedulerBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async scheduleOnce(job: IOnetimeSchedule): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async scheduleRecurring(job: IRecurringSchedule): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async cancelJob(jobId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async cancelAllJobs(): Promise<void> {
        /* Implementation Hidden */
    }
}

```