## File: apps/meteor/ee/server/lib/engagementDashboard/messages.ts

```typescript
import type { IDirectMessageRoom, IRoom, IMessage } from '@rocket.chat/core-typings';
import { Messages, Analytics } from '@rocket.chat/models';
import moment from 'moment';

import { convertDateToInt, diffBetweenDaysInclusive, convertIntToDate, getTotalOfWeekItems } from './date';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';

export const handleMessagesSent = async (message: IMessage, { room }: { room?: IRoom }): Promise<IMessage> => {
    /* Implementation Hidden */
};

export const handleMessagesDeleted = async (message: IMessage, { room }: { room: IRoom }): Promise<IMessage> => {
    /* Implementation Hidden */
};

export const fillFirstDaysOfMessagesIfNeeded = async (date: Date): Promise<void> => {
    /* Implementation Hidden */
};

export const findWeeklyMessagesSentData = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	days: { day: Date; messages: number }[];
	period: {
		count: number;
		variation: number;
	};
	yesterday: {
		count: number;
		variation: number;
	};
}> => {
    /* Implementation Hidden */
};

export const findMessagesSentOrigin = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	origins: {
		t: IRoom['t'];
		messages: number;
	}[];
}> => {
    /* Implementation Hidden */
};

export const findTopFivePopularChannelsByMessageSentQuantity = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	channels: {
		t: IRoom['t'];
		messages: number;
		name: IRoom['name'] | IRoom['fname'];
		usernames?: IDirectMessageRoom['usernames'];
	}[];
}> => {
    /* Implementation Hidden */
};

```