## File: apps/meteor/ee/app/livechat-enterprise/server/business-hour/Helper.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, Users } from '@rocket.chat/models';

import {
	makeAgentsUnavailableBasedOnBusinessHour,
	makeOnlineAgentsAvailable,
} from '../../../../../app/livechat/server/business-hour/Helper';
import { getAgentIdsForBusinessHour } from '../../../../../app/livechat/server/business-hour/getAgentIdsForBusinessHour';
import { businessHourLogger } from '../../../../../app/livechat/server/lib/logger';

export const getAgentIdsToHandle = async (businessHour: Pick<ILivechatBusinessHour, '_id' | 'type'>): Promise<string[]> => {
    /* Implementation Hidden */
};

export const openBusinessHour = async (
	businessHour: Pick<ILivechatBusinessHour, '_id' | 'type'>,
	updateLivechatStatus = true,
): Promise<void> => {
    /* Implementation Hidden */
};

export const removeBusinessHourByAgentIds = async (agentIds: string[], businessHourId: string): Promise<void> => {
    /* Implementation Hidden */
};

```