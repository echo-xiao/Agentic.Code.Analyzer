## File: apps/meteor/ee/app/livechat-enterprise/server/business-hour/Custom.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, Users } from '@rocket.chat/models';

import { businessHourManager } from '../../../../../app/livechat/server/business-hour';
import type { IBusinessHourType } from '../../../../../app/livechat/server/business-hour/AbstractBusinessHour';
import { AbstractBusinessHourType } from '../../../../../app/livechat/server/business-hour/AbstractBusinessHour';
import {
	filterBusinessHoursThatMustBeOpened,
	makeAgentsUnavailableBasedOnBusinessHour,
} from '../../../../../app/livechat/server/business-hour/Helper';
import { bhLogger } from '../lib/logger';

type IBusinessHoursExtraProperties = {
	timezoneName: string;
	departmentsToApplyBusinessHour: string;
};

class CustomBusinessHour extends AbstractBusinessHourType implements IBusinessHourType {
	name = LivechatBusinessHourTypes.CUSTOM;

	async getBusinessHour(id: string): Promise<ILivechatBusinessHour | null> {
        /* Implementation Hidden */
    }

	async saveBusinessHour(businessHour: ILivechatBusinessHour & IBusinessHoursExtraProperties): Promise<ILivechatBusinessHour> {
        /* Implementation Hidden */
    }

	async removeBusinessHourById(businessHourId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async removeBusinessHourFromAgents(businessHourId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async removeBusinessHourFromDepartmentsIfNeeded(businessHourId: string, departmentsToRemove: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	private async removeBHFromPreviouslyConnectedDepartmentAgentsIfRequired(departmentIds: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	private async addBusinessHourToDepartmentsIfNeeded(businessHourId: string, departmentsToAdd: string[]): Promise<void> {
        /* Implementation Hidden */
    }
}

businessHourManager.registerBusinessHourType(new CustomBusinessHour());

```