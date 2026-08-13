## File: apps/meteor/ee/server/lib/engagementDashboard/users.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users, Analytics, Sessions } from '@rocket.chat/models';
import moment from 'moment';

import { convertDateToInt, diffBetweenDaysInclusive, getTotalOfWeekItems, convertIntToDate } from './date';

export const handleUserCreated = async (user: IUser): Promise<IUser> => {
    /* Implementation Hidden */
};

export const fillFirstDaysOfUsersIfNeeded = async (date: Date): Promise<void> => {
    /* Implementation Hidden */
};

export const findWeeklyUsersRegisteredData = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	days: { day: Date; users: number }[];
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

const createDestructuredDate = (
	input: moment.MomentInput,
): {
	year: number;
	month: number;
	day: number;
} => {
    /* Implementation Hidden */
};

export const findActiveUsersMonthlyData = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	month: {
		day: number;
		month: number;
		year: number;
		usersList: IUser['_id'][];
		users: number;
	}[];
}> => ({
	month: await Sessions.getActiveUsersOfPeriodByDayBetweenDates({
		start: createDestructuredDate(start),
		end: createDestructuredDate(end),
	}),
});

export const findBusiestsChatsInADayByHours = async ({
	start,
}: {
	start: Date;
}): Promise<{
	hours: {
		hour: number;
		users: number;
	}[];
}> => ({
	hours: await Sessions.getBusiestTimeWithinHoursPeriod({
		start: moment(start).subtract(24, 'hours').toDate(),
		end: start,
		groupSize: 2,
	}),
});

export const findBusiestsChatsWithinAWeek = async ({
	start,
}: {
	start: Date;
}): Promise<{
	month: {
		day: number;
		month: number;
		year: number;
		users: number;
	}[];
}> => ({
	month: await Sessions.getTotalOfSessionsByDayBetweenDates({
		start: createDestructuredDate(moment(start).subtract(7, 'days')),
		end: createDestructuredDate(start),
	}),
});

export const findUserSessionsByHourWithinAWeek = async ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}): Promise<{
	week: {
		hour: number;
		day: number;
		month: number;
		year: number;
		users: number;
	}[];
}> => ({
	week: await Sessions.getTotalOfSessionByHourAndDayBetweenDates({
		start,
		end,
	}),
});

```