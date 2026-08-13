## File: packages/models/src/models/LivechatBusinessHours.ts

```typescript
import type { ILivechatBusinessHour, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import type { ILivechatBusinessHoursModel } from '@rocket.chat/model-typings';
import type { Collection, Db, Document, FindOptions } from 'mongodb';

import { BaseRaw } from './BaseRaw';

interface IWorkHoursCronJobsItem {
	day: string;
	times: string[];
}

export interface IWorkHoursCronJobsWrapper {
	start: IWorkHoursCronJobsItem[];
	finish: IWorkHoursCronJobsItem[];
}

export class LivechatBusinessHoursRaw extends BaseRaw<ILivechatBusinessHour> implements ILivechatBusinessHoursModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatBusinessHour>>) {
        /* Implementation Hidden */
    }

	async findOneDefaultBusinessHour(options?: undefined): Promise<ILivechatBusinessHour | null>;

	async findOneDefaultBusinessHour(options: FindOptions<ILivechatBusinessHour>): Promise<ILivechatBusinessHour | null>;

	async findOneDefaultBusinessHour<P extends Document>(
		options: FindOptions<P extends ILivechatBusinessHour ? ILivechatBusinessHour : P>,
	): Promise<P | null>;

	findOneDefaultBusinessHour<P>(options?: any): Promise<ILivechatBusinessHour | P | null> {
        /* Implementation Hidden */
    }

	findActiveAndOpenBusinessHoursByDay(day: string, options?: any): Promise<ILivechatBusinessHour[]> {
        /* Implementation Hidden */
    }

	findActiveBusinessHours(options: FindOptions<ILivechatBusinessHour> = {}): Promise<ILivechatBusinessHour[]> {
        /* Implementation Hidden */
    }

	findDefaultActiveAndOpenBusinessHoursByDay(day: string, options?: any): Promise<ILivechatBusinessHour[]> {
        /* Implementation Hidden */
    }

	override async insertOne(data: Omit<ILivechatBusinessHour, '_id' | '_updatedAt'>): Promise<any> {
        /* Implementation Hidden */
    }

	findHoursToScheduleJobs(): Promise<IWorkHoursCronJobsWrapper[]> {
        /* Implementation Hidden */
    }

	async findActiveBusinessHoursToOpen(
		day: string,
		start: string,
		type?: LivechatBusinessHourTypes,
		options?: any,
	): Promise<ILivechatBusinessHour[]> {
        /* Implementation Hidden */
    }

	async findActiveBusinessHoursToClose(
		day: string,
		finish: string,
		type?: LivechatBusinessHourTypes,
		options?: any,
	): Promise<ILivechatBusinessHour[]> {
        /* Implementation Hidden */
    }

	disableBusinessHour(businessHourId: string): Promise<any> {
        /* Implementation Hidden */
    }
}

```