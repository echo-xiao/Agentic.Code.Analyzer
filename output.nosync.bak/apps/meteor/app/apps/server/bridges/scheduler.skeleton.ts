## File: apps/meteor/app/apps/server/bridges/scheduler.ts

```typescript
import type { Job } from '@rocket.chat/agenda';
import { Agenda } from '@rocket.chat/agenda';
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { SchedulerBridge } from '@rocket.chat/apps/dist/server/bridges/SchedulerBridge';
import type { IProcessor, IOnetimeSchedule, IRecurringSchedule, IJobContext } from '@rocket.chat/apps-engine/definition/scheduler';
import { StartupType } from '@rocket.chat/apps-engine/definition/scheduler';
import { ObjectId } from 'bson';
import { MongoInternals } from 'meteor/mongo';

function _callProcessor(processor: IProcessor['processor']): (job: Job) => Promise<void> {
    /* Implementation Hidden */
}

/**
 * Provides the Apps Engine with task scheduling capabilities.
 * It uses {@link agenda:github.com/agenda/agenda} as backend
 */
export class AppSchedulerBridge extends SchedulerBridge {
	private isConnected: boolean;

	private scheduler: Agenda;

	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	/**
	 * Register processors that can be scheduled to run
	 *
	 * @param processors An array of processors
	 * @param appId
	 *
	 * @returns List of task ids run at startup, or void no startup run is set
	 */
	protected async registerProcessors(processors: Array<IProcessor> = [], appId: string): Promise<void | Array<string>> {
        /* Implementation Hidden */
    }

	/**
	 * Schedules a registered processor to run _once_.
	 */
	protected async scheduleOnce({ id, when, data }: IOnetimeSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	private async scheduleOnceAfterRegister(job: IOnetimeSchedule, appId: string): Promise<void | string> {
        /* Implementation Hidden */
    }

	/**
	 * Schedules a registered processor to run recurrently according to a given interval.
	 *
	 * @param {Object} job
	 * @param {string} job.id The processor's id
	 * @param {string} job.interval When the processor will be re executed
	 * @param {boolean} job.skipImmediate=false Whether to let the first iteration to execute as soon as the task is registered
	 * @param {Object} [job.data] An optional object that is passed to the processor
	 * @param {string} appId
	 *
	 * @returns {string} taskid
	 */
	protected async scheduleRecurring(
		{ id, interval, skipImmediate = false, data }: IRecurringSchedule,
		appId: string,
	): Promise<void | string> {
        /* Implementation Hidden */
    }

	/**
	 * Cancels a running job given its jobId
	 *
	 * @param {string} jobId
	 * @param {string} appId
	 *
	 * @returns Promise<void>
	 */
	protected async cancelJob(jobId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Cancels all the running jobs from the app
	 *
	 * @param {string} appId
	 *
	 * @returns Promise<void>
	 */
	protected async cancelAllJobs(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async startScheduler(): Promise<void> {
        /* Implementation Hidden */
    }

	private decorateJobData(jobData: object | undefined, appId: string): object {
        /* Implementation Hidden */
    }
}

```