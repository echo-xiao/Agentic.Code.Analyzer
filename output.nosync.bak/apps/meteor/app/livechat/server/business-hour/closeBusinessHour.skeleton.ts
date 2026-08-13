## File: apps/meteor/app/livechat/server/business-hour/closeBusinessHour.ts

```typescript
import type { ILivechatBusinessHour, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { makeFunction } from '@rocket.chat/patch-injection';

import { makeAgentsUnavailableBasedOnBusinessHour } from './Helper';
import { getAgentIdsForBusinessHour } from './getAgentIdsForBusinessHour';
import { businessHourLogger } from '../lib/logger';

export const closeBusinessHourByAgentIds = async (
	businessHourId: ILivechatBusinessHour['_id'],
	agentIds: IUser['_id'][],
): Promise<void> => {
    /* Implementation Hidden */
};

export const closeBusinessHour = makeFunction(async (businessHour: Pick<ILivechatBusinessHour, '_id' | 'type'>): Promise<void> => {
	const agentIds = await getAgentIdsForBusinessHour();
	return closeBusinessHourByAgentIds(businessHour._id, agentIds);
});

```