## File: ee/packages/presence/src/lib/PresenceReaper.ts

```typescript
import { setInterval } from 'node:timers';

import type { IUserSession } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { UsersSessions } from '@rocket.chat/models';
import type { AnyBulkWriteOperation } from 'mongodb';

const logger = new Logger('PresenceReaper');

type ReaperPlan = {
	userId: string;
	removeIds: NonEmptyArray<string>;
	cutoffDate: Date;
};

type NonEmptyArray<T> = Omit<[T, ...T[]], 'map'> & {
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U): NonEmptyArray<U>;
};

const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArray<T> => arr.length > 0;

type ReaperCallback = (userIds: NonEmptyArray<string>) => Promise<void>;

type ReaperOptions = {
	onUpdate: ReaperCallback;
	staleThresholdMs: number;
	batchSize: number;
};

export class PresenceReaper {
	private staleThresholdMs: number;

	private batchSize: number;

	private running: boolean;

	private onUpdate: ReaperCallback;

	private intervalId?: NodeJS.Timeout;

	constructor(options: ReaperOptions) {
        /* Implementation Hidden */
    }

	public start() {
        /* Implementation Hidden */
    }

	public stop() {
        /* Implementation Hidden */
    }

	public async run(): Promise<void> {
        /* Implementation Hidden */
    }

	private processDocument(sessionDoc: IUserSession, cutoffDate: Date, changeMap: Map<string, ReaperPlan>): void {
        /* Implementation Hidden */
    }

	private async flushBatch(changeMap: Map<string, ReaperPlan>): Promise<void> {
        /* Implementation Hidden */
    }
}

```