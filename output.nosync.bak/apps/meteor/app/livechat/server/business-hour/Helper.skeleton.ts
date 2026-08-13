## File: apps/meteor/app/livechat/server/business-hour/Helper.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { ILivechatAgentStatus, LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import { LivechatBusinessHours, Users } from '@rocket.chat/models';
import moment from 'moment';

import { createDefaultBusinessHourRow } from './LivechatBusinessHours';
import { filterBusinessHoursThatMustBeOpened } from './filterBusinessHoursThatMustBeOpened';
import { notifyOnUserChangeAsync } from '../../../lib/server/lib/notifyListener';
import { businessHourLogger } from '../lib/logger';

export { filterBusinessHoursThatMustBeOpened };

export const filterBusinessHoursThatMustBeOpenedByDay = async (
	businessHours: ILivechatBusinessHour[],
	day: string, // Format: moment.format('dddd')
): Promise<Pick<ILivechatBusinessHour, '_id' | 'type'>[]> => {
    /* Implementation Hidden */
};

export const openBusinessHourDefault = async (): Promise<void> => {
    /* Implementation Hidden */
};

export const createDefaultBusinessHourIfNotExists = async (): Promise<void> => {
    /* Implementation Hidden */
};

export async function makeAgentsUnavailableBasedOnBusinessHour(agentIds?: string[]) {
    /* Implementation Hidden */
}

export async function makeOnlineAgentsAvailable(agentIds?: string[]) {
    /* Implementation Hidden */
}

```