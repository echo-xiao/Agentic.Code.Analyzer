## File: apps/meteor/app/livechat/server/business-hour/BusinessHourManager.ts

```typescript
import type { ILivechatBusinessHour, IBusinessHourTimezone } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import type { AgendaCronJobs } from '@rocket.chat/cron';
import { LivechatBusinessHours, LivechatDepartment, Users } from '@rocket.chat/models';
import moment from 'moment-timezone';

import type { IBusinessHourBehavior, IBusinessHourType } from './AbstractBusinessHour';
import { closeBusinessHour } from './closeBusinessHour';
import { callbacks } from '../../../../server/lib/callbacks';
import { notifyOnUserChange } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { businessHourLogger } from '../lib/logger';

const CRON_EVERY_MIDNIGHT_EXPRESSION = '0 0 * * *';
const CRON_DAYLIGHT_JOB_NAME = 'livechat-business-hour-daylight-saving-time-verifier';

export class BusinessHourManager {
	private types: Map<string, IBusinessHourType> = new Map();

	private behavior: IBusinessHourBehavior;

	private cronJobs: AgendaCronJobs;

	private cronJobsCache: string[] = [];

	constructor(cronJobs: AgendaCronJobs) {
        /* Implementation Hidden */
    }

	async startManager(): Promise<void> {
        /* Implementation Hidden */
    }

	async stopManager(): Promise<void> {
        /* Implementation Hidden */
    }

	async restartManager(): Promise<void> {
        /* Implementation Hidden */
    }

	async cleanupDisabledDepartmentReferences(): Promise<void> {
        /* Implementation Hidden */
    }

	async allowAgentChangeServiceStatus(agentId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	registerBusinessHourType(businessHourType: IBusinessHourType): void {
        /* Implementation Hidden */
    }

	registerBusinessHourBehavior(behavior: IBusinessHourBehavior): void {
        /* Implementation Hidden */
    }

	async getBusinessHour(id?: string, type?: string): Promise<ILivechatBusinessHour | null> {
        /* Implementation Hidden */
    }

	async saveBusinessHour(businessHourData: ILivechatBusinessHour): Promise<void> {
        /* Implementation Hidden */
    }

	async removeBusinessHourByIdAndType(id: string, type: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onLogin(agentId: string): Promise<any> {
        /* Implementation Hidden */
    }

	async restartCronJobsIfNecessary(): Promise<void> {
        /* Implementation Hidden */
    }

	private setupCallbacks(): void {
        /* Implementation Hidden */
    }

	private removeCallbacks(): void {
        /* Implementation Hidden */
    }

	private async createCronJobsForWorkHours(): Promise<void> {
        /* Implementation Hidden */
    }

	private async scheduleCronJob(
		items: string[],
		day: string,
		type: 'open' | 'close',
		job: (day: string, hour: string) => void,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async openWorkHoursCallback(day: string, hour: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async closeWorkHoursCallback(day: string, hour: string): Promise<void> {
        /* Implementation Hidden */
    }

	private getBusinessHourType(type: string): IBusinessHourType | undefined {
        /* Implementation Hidden */
    }

	private async removeCronJobs(): Promise<void> {
        /* Implementation Hidden */
    }

	private addToCache(jobName: string): void {
        /* Implementation Hidden */
    }

	private clearCronJobsCache(): void {
        /* Implementation Hidden */
    }

	hasDaylightSavingTimeChanged(timezone: IBusinessHourTimezone): boolean {
        /* Implementation Hidden */
    }

	async registerDaylightSavingTimeCronJob(): Promise<void> {
        /* Implementation Hidden */
    }

	async startDaylightSavingTimeVerifier(): Promise<void> {
        /* Implementation Hidden */
    }
}

```