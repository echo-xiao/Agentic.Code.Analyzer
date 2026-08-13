## File: apps/meteor/app/statistics/server/lib/SAUMonitor.ts

```typescript
import type { ISession, ISessionDevice, IUser } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { Logger } from '@rocket.chat/logger';
import { Sessions, Users, aggregates } from '@rocket.chat/models';
import mem from 'mem';
import { Meteor } from 'meteor/meteor';
import UAParser from 'ua-parser-js';

import { UAParserMobile, UAParserDesktop } from './UAParserCustom';
import { getMostImportantRole } from '../../../../lib/roles/getMostImportantRole';
import { sauEvents } from '../../../../server/services/sauMonitor/events';

type DateObj = { day: number; month: number; year: number };

const getDateObj = (dateTime = new Date()): DateObj => ({
	day: dateTime.getDate(),
	month: dateTime.getMonth() + 1,
	year: dateTime.getFullYear(),
});

const logger = new Logger('SAUMonitor');

const getUserRoles = mem(
	async (userId: string): Promise<string[]> => {
		const user = await Users.findOneById<Pick<IUser, 'roles'>>(userId, { projection: { roles: 1 } });

		return user?.roles || [];
	},
	{ maxAge: 5000 },
);

const isProdEnv = process.env.NODE_ENV === 'production';

type HandleSessionArgs = {
	userId: string;
	instanceId: string;
	userAgent: string;
	loginToken?: string;
	connectionId: string;
	clientAddress: string;
	host: string;
};

/**
 * Server Session Monitor for SAU(Simultaneously Active Users) based on Meteor server sessions
 */
export class SAUMonitorClass {
	private _started: boolean;

	private _dailyComputeJobName: string;

	private _dailyFinishSessionsJobName: string;

	private scheduler = cronJobs;

	constructor() {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }

	async stop(): Promise<void> {
        /* Implementation Hidden */
    }

	isRunning(): boolean {
        /* Implementation Hidden */
    }

	async _startMonitoring(): Promise<void> {
        /* Implementation Hidden */
    }

	private _handleOnConnection(): void {
        /* Implementation Hidden */
    }

	private _handleAccountEvents(): void {
        /* Implementation Hidden */
    }

	private async _handleSession(
		{ userId, instanceId, userAgent, loginToken, connectionId, clientAddress, host }: HandleSessionArgs,
		params: Pick<ISession, 'mostImportantRole' | 'loginAt' | 'day' | 'month' | 'year' | 'roles'>,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async _finishSessionsFromDate(yesterday: Date, today: Date): Promise<void> {
        /* Implementation Hidden */
    }

	private _getSearchTerm(session: Omit<ISession, '_id' | '_updatedAt' | 'createdAt' | 'searchTerm'>): string {
        /* Implementation Hidden */
    }

	private _getUserAgentInfo(uaString: string): { device: ISessionDevice } | undefined {
        /* Implementation Hidden */
    }

	private async _startCronjobs(): Promise<void> {
        /* Implementation Hidden */
    }

	private async _aggregate(): Promise<void> {
        /* Implementation Hidden */
    }
}

```