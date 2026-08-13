## File: packages/apps/src/server/managers/AppSchedulerManager.ts

```typescript
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IJobContext, IOnetimeSchedule, IProcessor, IRecurringSchedule } from '@rocket.chat/apps-engine/definition/scheduler';

import type { AppManager } from '../AppManager';
import type { IInternalSchedulerBridge } from '../bridges/IInternalSchedulerBridge';
import type { SchedulerBridge } from '../bridges/SchedulerBridge';

function createProcessorId(jobId: string, appId: string): string {
    /* Implementation Hidden */
}

export class AppSchedulerManager {
	private readonly bridge: SchedulerBridge;

	private registeredProcessors: Map<string, { [processorId: string]: IProcessor }>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	public async registerProcessors(processors: Array<IProcessor> = [], appId: string): Promise<void | Array<string>> {
        /* Implementation Hidden */
    }

	public wrapProcessor(appId: string, processorId: string): IProcessor['processor'] {
        /* Implementation Hidden */
    }

	public async scheduleOnce(job: IOnetimeSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async scheduleRecurring(job: IRecurringSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async cancelJob(jobId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async cancelAllJobs(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async cleanUp(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private isNotToRunJob(status: AppStatus, previousStatus: AppStatus): boolean {
        /* Implementation Hidden */
    }
}

```