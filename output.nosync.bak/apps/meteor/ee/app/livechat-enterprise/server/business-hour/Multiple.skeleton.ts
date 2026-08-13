## File: apps/meteor/ee/app/livechat-enterprise/server/business-hour/Multiple.ts

```typescript
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import type { AtLeast, ILivechatDepartment, ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, Users } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';
import moment from 'moment';

import { openBusinessHour, removeBusinessHourByAgentIds } from './Helper';
import { businessHourManager } from '../../../../../app/livechat/server/business-hour';
import type { IBusinessHourBehavior } from '../../../../../app/livechat/server/business-hour/AbstractBusinessHour';
import { AbstractBusinessHourBehavior } from '../../../../../app/livechat/server/business-hour/AbstractBusinessHour';
import {
	filterBusinessHoursThatMustBeOpened,
	filterBusinessHoursThatMustBeOpenedByDay,
	makeOnlineAgentsAvailable,
	makeAgentsUnavailableBasedOnBusinessHour,
} from '../../../../../app/livechat/server/business-hour/Helper';
import { closeBusinessHour } from '../../../../../app/livechat/server/business-hour/closeBusinessHour';
import { settings } from '../../../../../app/settings/server';
import { bhLogger } from '../lib/logger';

interface IBusinessHoursExtraProperties extends ILivechatBusinessHour {
	timezoneName: string;
	departmentsToApplyBusinessHour: string;
}

export class MultipleBusinessHoursBehavior extends AbstractBusinessHourBehavior implements IBusinessHourBehavior {
	constructor() {
        /* Implementation Hidden */
    }

	async onStartBusinessHours(): Promise<void> {
        /* Implementation Hidden */
    }

	async openBusinessHoursByDayAndHour(day: string, hour: string): Promise<void> {
        /* Implementation Hidden */
    }

	async closeBusinessHoursByDayAndHour(day: string, hour: string): Promise<void> {
        /* Implementation Hidden */
    }

	async afterSaveBusinessHours(businessHourData: IBusinessHoursExtraProperties): Promise<void> {
        /* Implementation Hidden */
    }

	async onAddAgentToDepartment(options: { departmentId: string; agentsId: string[] }): Promise<any> {
        /* Implementation Hidden */
    }

	async onRemoveAgentFromDepartment(options: Record<string, any> = {}): Promise<any> {
        /* Implementation Hidden */
    }

	async onRemoveDepartment(options: { department: AtLeast<ILivechatDepartment, '_id' | 'businessHourId'>; agentsIds: string[] }) {
        /* Implementation Hidden */
    }

	async onDepartmentDisabled(department: AtLeast<ILivechatDepartment, 'businessHourId' | '_id'>): Promise<void> {
        /* Implementation Hidden */
    }

	async onDepartmentArchived(department: Pick<ILivechatDepartment, '_id' | 'businessHourId'>): Promise<void> {
        /* Implementation Hidden */
    }

	override allowAgentChangeServiceStatus(agentId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async onNewAgentCreated(agentId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async applyAnyOpenBusinessHourToAgent(agentId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async handleRemoveAgentsFromDepartments(department: Record<string, any>, agentsIds: string[], options: any): Promise<any> {
        /* Implementation Hidden */
    }

	private async openBusinessHour(businessHour: Pick<ILivechatBusinessHour, '_id' | 'type'>): Promise<void> {
        /* Implementation Hidden */
    }

	private async removeBusinessHourFromRemovedDepartmentsUsersIfNeeded(
		businessHourId: string,
		departmentsToRemove: string[],
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async closeBusinessHour(businessHour: Pick<ILivechatBusinessHour, '_id' | 'type'>): Promise<void> {
        /* Implementation Hidden */
    }
}

```