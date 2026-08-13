## File: apps/meteor/app/livechat/server/lib/analytics/dashboards.ts

```typescript
import { OmnichannelAnalytics } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { LivechatRooms, Users, LivechatVisitors, LivechatAgentActivity } from '@rocket.chat/models';
import mem from 'mem';
import moment from 'moment';

import { secondsToHHMMSS } from '../../../../../lib/utils/secondsToHHMMSS';
import { settings } from '../../../../settings/server';
import { getAnalyticsOverviewDataCachedForRealtime } from '../AnalyticsTyped';
import {
	findPercentageOfAbandonedRoomsAsync,
	findAllAverageOfChatDurationTimeAsync,
	findAllAverageWaitingTimeAsync,
	findAllNumberOfAbandonedRoomsAsync,
	findAllAverageServiceTimeAsync,
} from './departments';

const findAllChatsStatusAsync = async ({ start, end, departmentId = undefined }: { start: Date; end: Date; departmentId?: string }) => {
    /* Implementation Hidden */
};

const getProductivityMetricsAsync = async ({
	start,
	end,
	departmentId = undefined,
	user,
}: {
	start: string;
	end: string;
	departmentId?: string;
	user: IUser;
}) => {
    /* Implementation Hidden */
};

const getAgentsProductivityMetricsAsync = async ({
	start,
	end,
	departmentId = undefined,
	user,
}: {
	start: string;
	end: string;
	departmentId?: string;
	user: IUser;
}) => {
    /* Implementation Hidden */
};

const getChatsMetricsAsync = async ({ start, end, departmentId = undefined }: { start: Date; end: Date; departmentId?: string }) => {
    /* Implementation Hidden */
};

const getConversationsMetricsAsync = async ({
	start,
	end,
	departmentId,
	user,
}: {
	start: string;
	end: string;
	departmentId?: string;
	user: IUser;
}) => {
    /* Implementation Hidden */
};

const findAllChatMetricsByAgentAsync = async ({
	start,
	end,
	departmentId = undefined,
}: {
	start: Date;
	end: Date;
	departmentId?: string;
}) => {
    /* Implementation Hidden */
};

const findAllAgentsStatusAsync = async ({ departmentId = undefined }: { departmentId?: string }) =>
	(await Users.countAllAgentsStatus({ departmentId }))[0];

const findAllChatMetricsByDepartmentAsync = async ({
	start,
	end,
	departmentId = undefined,
}: {
	start: Date;
	end: Date;
	departmentId?: string;
}) => {
    /* Implementation Hidden */
};

const findAllResponseTimeMetricsAsync = async ({
	start,
	end,
	departmentId = undefined,
}: {
	start: Date;
	end: Date;
	departmentId?: string;
}) => {
    /* Implementation Hidden */
};

export const getConversationsMetricsAsyncCached = mem(getConversationsMetricsAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const getAgentsProductivityMetricsAsyncCached = mem(getAgentsProductivityMetricsAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const getChatsMetricsAsyncCached = mem(getChatsMetricsAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const getProductivityMetricsAsyncCached = mem(getProductivityMetricsAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const findAllChatsStatusAsyncCached = mem(findAllChatsStatusAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const findAllChatMetricsByAgentAsyncCached = mem(findAllChatMetricsByAgentAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const findAllAgentsStatusAsyncCached = mem(findAllAgentsStatusAsync, { maxAge: 5000, cacheKey: JSON.stringify });
export const findAllChatMetricsByDepartmentAsyncCached = mem(findAllChatMetricsByDepartmentAsync, {
	maxAge: 5000,
	cacheKey: JSON.stringify,
});
export const findAllResponseTimeMetricsAsyncCached = mem(findAllResponseTimeMetricsAsync, { maxAge: 5000, cacheKey: JSON.stringify });

```