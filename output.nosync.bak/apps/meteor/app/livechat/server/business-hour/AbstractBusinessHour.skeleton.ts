## File: apps/meteor/app/livechat/server/business-hour/AbstractBusinessHour.ts

```typescript
import type { AtLeast, ILivechatAgentStatus, ILivechatBusinessHour, ILivechatDepartment } from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';
import type { ILivechatBusinessHoursModel, IUsersModel } from '@rocket.chat/model-typings';
import { LivechatBusinessHours, Users } from '@rocket.chat/models';
import type { IWorkHoursCronJobsWrapper } from '@rocket.chat/models';
import moment from 'moment-timezone';
import type { UpdateFilter } from 'mongodb';

import { notifyOnUserChange } from '../../../lib/server/lib/notifyListener';

export interface IBusinessHourBehavior {
	findHoursToCreateJobs(): Promise<IWorkHoursCronJobsWrapper[]>;
	openBusinessHoursByDayAndHour(day: string, hour: string): Promise<void>;
	closeBusinessHoursByDayAndHour(day: string, hour: string): Promise<void>;
	onDisableBusinessHours(): Promise<void>;
	onAddAgentToDepartment(options?: { departmentId: string; agentsId: string[] }): Promise<any>;
	onRemoveAgentFromDepartment(options?: Record<string, any>): Promise<any>;
	onRemoveDepartment(options: { department: ILivechatDepartment; agentsIds: string[] }): Promise<any>;
	onDepartmentDisabled(department?: AtLeast<ILivechatDepartment, '_id' | 'businessHourId'>): Promise<void>;
	onDepartmentArchived(department: Pick<ILivechatDepartment, '_id' | 'businessHourId'>): Promise<void>;
	onStartBusinessHours(): Promise<void>;
	afterSaveBusinessHours(businessHourData: ILivechatBusinessHour): Promise<void>;
	allowAgentChangeServiceStatus(agentId: string): Promise<boolean>;
	changeAgentActiveStatus(agentId: string, status: string): Promise<any>;
	// If a new agent is created, this callback will be called
	onNewAgentCreated(agentId: string): Promise<void>;
}

export interface IBusinessHourType {
	name: string;
	getBusinessHour(id?: string): Promise<ILivechatBusinessHour | null>;
	saveBusinessHour(businessHourData: ILivechatBusinessHour): Promise<ILivechatBusinessHour>;
	removeBusinessHourById(id: string): Promise<void>;
}

export abstract class AbstractBusinessHourBehavior {
	protected BusinessHourRepository: ILivechatBusinessHoursModel = LivechatBusinessHours;

	protected UsersRepository: IUsersModel = Users;

	async findHoursToCreateJobs(): Promise<IWorkHoursCronJobsWrapper[]> {
        /* Implementation Hidden */
    }

	async onDisableBusinessHours(): Promise<void> {
        /* Implementation Hidden */
    }

	async allowAgentChangeServiceStatus(agentId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async changeAgentActiveStatus(agentId: string, status: ILivechatAgentStatus): Promise<any> {
        /* Implementation Hidden */
    }
}

export abstract class AbstractBusinessHourType {
	protected BusinessHourRepository: ILivechatBusinessHoursModel = LivechatBusinessHours;

	protected UsersRepository: IUsersModel = Users;

	protected async baseSaveBusinessHour(businessHourData: ILivechatBusinessHour): Promise<string> {
        /* Implementation Hidden */
    }

	private convertWorkHours(businessHourData: ILivechatBusinessHour): ILivechatBusinessHour {
        /* Implementation Hidden */
    }

	protected getUTCFromTimezone(timezone?: string): string {
        /* Implementation Hidden */
    }

	private formatDayOfTheWeekFromServerTimezoneAndUtcHour(utc: any, format: string): string {
        /* Implementation Hidden */
    }
}

```