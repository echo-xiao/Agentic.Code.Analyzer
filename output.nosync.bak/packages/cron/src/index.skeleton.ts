## File: packages/cron/src/index.ts

```typescript
import { type Job, Agenda } from '@rocket.chat/agenda';
import { Logger } from '@rocket.chat/logger';
import { CronHistory } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import type { Db } from 'mongodb';

const logger = new Logger('Cron');

const runCronJobFunctionAndPersistResult = async (fn: () => Promise<any>, jobName: string): Promise<void> => {
    /* Implementation Hidden */
};

type ReservedJob = {
	name: string;
	callback: () => any | Promise<any>;
} & (
	| {
			schedule: string;
			timestamped: false;
	  }
	| {
			when: Date;
			timestamped: true;
	  }
);

export class AgendaCronJobs {
	private reservedJobs: ReservedJob[] = [];

	private scheduler: Agenda | undefined;

	public get started(): boolean {
		return Boolean(this.scheduler);
	}

	public async start(mongo: Db): Promise<void> {
        /* Implementation Hidden */
    }

	public async add(name: string, schedule: string, callback: () => any | Promise<any>): Promise<void> {
        /* Implementation Hidden */
    }

	public async addAtTimestamp(name: string, when: Date, callback: () => any | Promise<any>): Promise<void> {
        /* Implementation Hidden */
    }

	public async remove(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async has(jobName: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async reserve(config: ReservedJob): Promise<void> {
        /* Implementation Hidden */
    }

	private async unreserve(jobName: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async define(jobName: string, callback: () => any | Promise<any>): Promise<void> {
        /* Implementation Hidden */
    }
}

export const cronJobs = new AgendaCronJobs();

```