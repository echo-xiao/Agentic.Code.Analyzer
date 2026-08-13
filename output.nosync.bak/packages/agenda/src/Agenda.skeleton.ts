## File: packages/agenda/src/Agenda.ts

```typescript
import { EventEmitter } from 'node:events';

import debugInitializer from 'debug';
import humanInterval from 'human-interval';
import { MongoClient } from 'mongodb';
import type { MongoClientOptions, Db, Document, Collection, InsertOneResult } from 'mongodb';

import { Job } from './Job';
import { JobProcessingQueue } from './JobProcessingQueue';
import { createJob } from './createJob';
import type { IJob } from './definition/IJob';
import type { JobDefinition, JobOptions } from './definition/JobDefinition';
import { hasMongoProtocol } from './lib/hasMongoProtocol';
import { noCallback } from './lib/noCallback';

const debug = debugInitializer('agenda:agenda');

const defaultInterval = 5000;

type JobSort = Partial<Record<keyof IJob, 1 | -1>>;

type MongoTopology = {
	autoReconnect?: boolean;
	connections?(): unknown[];
	isDestroyed?(): boolean;
};

type MongoDB = Db & {
	s?: {
		client?: {
			topology?: MongoTopology;
		};
	};
	db?: {
		s?: {
			client?: {
				topology?: MongoTopology;
			};
		};
	};
	topology?: {
		s?: {
			options?: {
				useUnifiedTopology?: boolean;
			};
		};
	};
};

type AgendaConfig = {
	name?: string;
	processEvery?: string;
	defaultConcurrency?: number;
	maxConcurrency?: number;
	defaultLockLimit?: number;
	lockLimit?: number;
	defaultLockLifeTime?: number;

	sort?: JobSort;
} & (
	| {
			mongo: MongoDB;
			db?: {
				collection?: string;
			};
	  }
	| {
			mongo?: undefined;
			db?: {
				address: string;
				collection?: string;
				options?: MongoClientOptions;
			};
	  }
);

export type RepeatOptions = { timezone?: string; skipImmediate?: boolean };

export class Agenda extends EventEmitter {
	private _name: string | undefined;

	private _processEvery: number;

	private _defaultConcurrency: number;

	private _maxConcurrency: number;

	private _defaultLockLimit: number;

	private _defaultLockLifetime: number;

	protected _db: MongoClient | undefined;

	private _mdb: MongoDB | undefined;

	private _collection: Collection | undefined;

	private _definitions: Record<string, JobDefinition> = {};

	private _runningJobs: Job[];

	private _lockedJobs: Job[];

	private _jobsToLock: Job[];

	private _jobQueue: JobProcessingQueue;

	private _lockLimit: number;

	private _sort: JobSort;

	private _indexes: JobSort;

	private _isLockingOnTheFly: boolean;

	private _ready: Promise<void>;

	private _processInterval: NodeJS.Timeout | undefined;

	private _nextScanAt?: Date;

	private _mongoUseUnifiedTopology: boolean | undefined;

	constructor(config: AgendaConfig = {}) {
        /* Implementation Hidden */
    }

	public mongo(mdb: MongoDB, collection: string | undefined) {
        /* Implementation Hidden */
    }

	/**
	 * * NOTE:
	 * If `url` includes auth details then `options` must specify: { 'uri_decode_auth': true }. This does Auth on
	 * the specified database, not the Admin database. If you are using Auth on the Admin DB and not on the Agenda DB,
	 * then you need to authenticate against the Admin DB and then pass the MongoDB instance into the constructor
	 * or use Agenda.mongo(). If your app already has a MongoDB connection then use that. ie. specify config.mongo in
	 * the constructor or use Agenda.mongo().
	 */
	public async database(url: string, collection: string | undefined, options: MongoClientOptions = {}) {
        /* Implementation Hidden */
    }

	public async dbInit(collection: string | undefined) {
        /* Implementation Hidden */
    }

	public name(name: string): Agenda {
        /* Implementation Hidden */
    }

	public processEvery(time: string): Agenda {
        /* Implementation Hidden */
    }

	public maxConcurrency(num: number): Agenda {
        /* Implementation Hidden */
    }

	public defaultConcurrency(num: number): Agenda {
        /* Implementation Hidden */
    }

	public lockLimit(num: number): Agenda {
        /* Implementation Hidden */
    }

	public defaultLockLimit(num: number): Agenda {
        /* Implementation Hidden */
    }

	public defaultLockLifetime(ms: number): Agenda {
        /* Implementation Hidden */
    }

	public sort(query: JobSort): Agenda {
        /* Implementation Hidden */
    }

	public create(name: string, data: IJob['data'] = {}): Job {
        /* Implementation Hidden */
    }

	private getCollection(): Collection {
        /* Implementation Hidden */
    }

	private getMongoDB(): MongoDB {
        /* Implementation Hidden */
    }

	public async jobs(query = {}, sort = {}, limit = 0, skip = 0): Promise<Job[]> {
        /* Implementation Hidden */
    }

	public async purge(): Promise<unknown> {
        /* Implementation Hidden */
    }

	public define(name: string, processor: JobDefinition['fn']): void;

	public define(name: string, maybeOptions: Partial<JobOptions> | JobDefinition['fn'], maybeProcessor?: JobDefinition['fn']): void {
        /* Implementation Hidden */
    }

	public async every(interval: string | number, name: string, data: IJob['data'], options: RepeatOptions): Promise<Job>;

	public async every(interval: string | number, names: string[], data: IJob['data'], options: RepeatOptions): Promise<Job[]>;

	public async every(
		interval: string | number,
		names: string | string[],
		data: IJob['data'],
		options: RepeatOptions,
	): Promise<Job | Job[] | undefined> {
        /* Implementation Hidden */
    }

	public async _createIntervalJob(interval: string | number, name: string, data: IJob['data'], options: RepeatOptions): Promise<Job> {
        /* Implementation Hidden */
    }

	private _createIntervalJobs(
		interval: string | number,
		names: string[],
		data: IJob['data'],
		options: RepeatOptions,
	): Promise<Job[]> | undefined {
        /* Implementation Hidden */
    }

	private async _createScheduledJob(when: string | Date, name: string, data: IJob['data']): Promise<Job> {
        /* Implementation Hidden */
    }

	private async _createScheduledJobs(when: string | Date, names: string[], data: IJob['data']): Promise<Job[]> {
        /* Implementation Hidden */
    }

	public schedule(when: string | Date, name: string, data: IJob['data']): Promise<Job>;

	public schedule(when: string | Date, names: string[], data: IJob['data']): Promise<Job[]>;

	public schedule(when: string | Date, names: string | string[], data: IJob['data']): Promise<Job | Job[]> {
        /* Implementation Hidden */
    }

	public async now(name: string, data: IJob['data'], ...args: Array<any>): Promise<Job> {
        /* Implementation Hidden */
    }

	public async cancel(query: Record<string, any>): Promise<number> {
        /* Implementation Hidden */
    }

	public async has(query: Record<string, any>): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async _processDbResult(job: Job, result: Document | InsertOneResult | null): Promise<void> {
        /* Implementation Hidden */
    }

	private async _updateJob(job: Job, props: Record<string, any>): Promise<void> {
        /* Implementation Hidden */
    }

	private async _saveSingleJob(job: Job, props: Record<string, any>, now: Date): Promise<void> {
        /* Implementation Hidden */
    }

	private async _saveUniqueJob(job: Job, props: Record<string, any>): Promise<void> {
        /* Implementation Hidden */
    }

	private async _saveNewJob(job: Job, props: Record<string, any>): Promise<void> {
        /* Implementation Hidden */
    }

	public async saveJob(job: Job): Promise<void> {
        /* Implementation Hidden */
    }

	public async start(): Promise<void> {
        /* Implementation Hidden */
    }

	private async _unlockJobs(): Promise<void> {
        /* Implementation Hidden */
    }

	public stop(): Promise<void> {
        /* Implementation Hidden */
    }

	public getDefinition(jobName: string): JobDefinition {
        /* Implementation Hidden */
    }

	private async _findAndLockNextJob(jobName: string, definition: JobDefinition): Promise<Job | undefined> {
        /* Implementation Hidden */
    }

	/**
	 * Returns true if a job of the specified name can be locked.
	 * Considers maximum locked jobs at any time if self._lockLimit is > 0
	 * Considers maximum locked jobs of the specified name at any time if jobDefinition.lockLimit is > 0
	 */
	private _shouldLock(name: string): boolean {
        /* Implementation Hidden */
    }

	private _enqueueJobs(job: Job | Job[]): void {
        /* Implementation Hidden */
    }

	/**
	 * Internal method that will lock a job and store it on MongoDB
	 * This method is called when we immediately start to process a job without using the process interval
	 * We do this because sometimes jobs are scheduled but will be run before the next process time
	 */
	private async _lockOnTheFly(): Promise<void> {
        /* Implementation Hidden */
    }

	private async _jobQueueFilling(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async _runOrRetry(): Promise<void> {
        /* Implementation Hidden */
    }

	private _jobProcessing(): void {
        /* Implementation Hidden */
    }

	private _processJobResult(err: Error | null, job: Job): void {
        /* Implementation Hidden */
    }

	public processJobs(extraJob?: Job): void {
        /* Implementation Hidden */
    }
}

```