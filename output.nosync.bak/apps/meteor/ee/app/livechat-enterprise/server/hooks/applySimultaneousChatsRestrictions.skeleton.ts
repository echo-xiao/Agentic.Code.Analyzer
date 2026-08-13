## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/applySimultaneousChatsRestrictions.ts

```typescript
import type { ILivechatDepartment, AvailableAgentsAggregation } from '@rocket.chat/core-typings';
import { LivechatDepartment } from '@rocket.chat/models';
import type { Filter } from 'mongodb';

import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';

export async function getChatLimitsQuery(departmentId?: string): Promise<Filter<AvailableAgentsAggregation>> {
    /* Implementation Hidden */
}

callbacks.add(
	'livechat.applySimultaneousChatRestrictions',
	async (_: any, { departmentId }: { departmentId?: string } = {}) => {
		return getChatLimitsQuery(departmentId);
	},
	callbacks.priority.HIGH,
	'livechat-apply-simultaneous-restrictions',
);

```