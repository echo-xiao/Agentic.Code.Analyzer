## File: apps/meteor/ee/server/lib/engagementDashboard/channels.ts

```typescript
import type { IDirectMessageRoom, IRoom } from '@rocket.chat/core-typings';
import { Analytics } from '@rocket.chat/models';
import moment from 'moment';

import { convertDateToInt, diffBetweenDaysInclusive } from './date';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';

export const findChannelsWithNumberOfMessages = async ({
	start,
	end,
	options = {},
}: {
	start: Date;
	end: Date;
	options: {
		offset?: number;
		count?: number;
	};
}): Promise<{
	channels: {
		room: {
			_id: IRoom['_id'];
			name: IRoom['name'] | IRoom['fname'];
			ts: IRoom['ts'];
			t: IRoom['t'];
			_updatedAt: IRoom['_updatedAt'];
			usernames?: IDirectMessageRoom['usernames'];
		};
		messages: number;
		lastWeekMessages: number;
		diffFromLastWeek: number;
	}[];
	total: number;
}> => {
    /* Implementation Hidden */
};

```