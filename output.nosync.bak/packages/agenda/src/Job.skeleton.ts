## File: packages/agenda/src/Job.ts

```typescript
import { CronTime } from 'cron';
import date from 'date.js';
import debugInitializer from 'debug';
import humanInterval from 'human-interval';
import moment from 'moment-timezone';

import type { Agenda, RepeatOptions } from './Agenda';
import type { IJob, IJobAttributes } from './definition/IJob';
import { noCallback } from './lib/noCallback';
import { parsePriority } from './lib/parsePriority';

const debug = debugInitializer('agenda:job');

export type JobArgs = {
	agenda: Agenda;
} & IJob;

export class Job {
	public agenda: Agenda;

	public attrs: IJobAttributes;

	constructor({ agenda, priority, ...args }: JobArgs) {
        /* Implementation Hidden */
    }

	public toJSON(): Partial<IJob> {
        /* Implementation Hidden */
    }

	public computeNextRunAt(): Job {
        /* Implementation Hidden */
    }

	public dateForTimezone(date: Date, timezone?: string | null): moment.Moment {
        /* Implementation Hidden */
    }

	private _computeFromInterval(interval: string | number, previousNextRunAt: Date): void {
        /* Implementation Hidden */
    }

	private _computeFromRepeatAt(repeatAt: string): void {
        /* Implementation Hidden */
    }

	public repeatEvery(interval: string | number, options: RepeatOptions = {}): Job {
        /* Implementation Hidden */
    }

	public repeatAt(time: string): Job {
        /* Implementation Hidden */
    }

	public disable(): Job {
        /* Implementation Hidden */
    }

	public enable(): Job {
        /* Implementation Hidden */
    }

	public unique(unique: IJobAttributes['unique'], opts?: IJobAttributes['uniqueOpts']): Job {
        /* Implementation Hidden */
    }

	public schedule(time: string | Date): Job {
        /* Implementation Hidden */
    }

	public priority(priority: string): Job {
        /* Implementation Hidden */
    }

	public fail(reason: Error | string): Job {
        /* Implementation Hidden */
    }

	public run(): Promise<Job> {
        /* Implementation Hidden */
    }

	public isRunning(): boolean {
        /* Implementation Hidden */
    }

	public save(...args: Array<any>): Promise<void> {
        /* Implementation Hidden */
    }

	public remove(): Promise<number> {
        /* Implementation Hidden */
    }

	public async touch(...args: Array<any>): Promise<void> {
        /* Implementation Hidden */
    }
}

```