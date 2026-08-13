## File: packages/apps/tests/test-data/bridges/schedulerBridge.ts

```typescript
import type { IOnetimeSchedule, IProcessor, IRecurringSchedule } from '@rocket.chat/apps-engine/definition/scheduler';

import { SchedulerBridge } from '../../../src/server/bridges';

export class TestSchedulerBridge extends SchedulerBridge {
	public async registerProcessors(processors: Array<IProcessor>, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async scheduleOnce(job: IOnetimeSchedule, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async scheduleRecurring(job: IRecurringSchedule, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async cancelJob(jobId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async cancelAllJobs(appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```