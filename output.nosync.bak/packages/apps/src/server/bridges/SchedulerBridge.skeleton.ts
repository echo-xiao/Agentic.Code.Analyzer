## File: packages/apps/src/server/bridges/SchedulerBridge.ts

```typescript
import type { IOnetimeSchedule, IProcessor, IRecurringSchedule } from '@rocket.chat/apps-engine/definition/scheduler';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class SchedulerBridge extends BaseBridge {
	public async doRegisterProcessors(processors: Array<IProcessor> = [], appId: string): Promise<void | Array<string>> {
        /* Implementation Hidden */
    }

	public async doScheduleOnce(job: IOnetimeSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async doScheduleRecurring(job: IRecurringSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	public async doCancelJob(jobId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doCancelAllJobs(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract registerProcessors(processors: Array<IProcessor>, appId: string): Promise<void | Array<string>>;

	protected abstract scheduleOnce(job: IOnetimeSchedule, appId: string): Promise<void | string>;

	protected abstract scheduleRecurring(job: IRecurringSchedule, appId: string): Promise<void | string>;

	protected abstract cancelJob(jobId: string, appId: string): Promise<void>;

	protected abstract cancelAllJobs(appId: string): Promise<void>;

	private hasDefaultPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```