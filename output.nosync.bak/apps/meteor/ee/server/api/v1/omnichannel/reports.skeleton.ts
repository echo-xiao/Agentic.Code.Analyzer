## File: apps/meteor/ee/server/api/v1/omnichannel/reports.ts

```typescript
import { isGETDashboardConversationsByType } from '@rocket.chat/rest-typings';
import type { Moment } from 'moment';
import moment from 'moment';

import {
	findAllConversationsBySourceCached,
	findAllConversationsByStatusCached,
	findAllConversationsByDepartmentCached,
	findAllConversationsByTagsCached,
	findAllConversationsByAgentsCached,
} from './lib/dashboards';
import { API } from '../../../../../server/api';
import { restrictQuery } from '../../../../app/livechat-enterprise/server/lib/restrictQuery';

const checkDates = (start: Moment, end: Moment) => {
    /* Implementation Hidden */
};

API.v1.addRoute(
	'livechat/analytics/dashboards/conversations-by-source',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-reports'],
		validateParams: isGETDashboardConversationsByType,
		license: ['livechat-enterprise'],
	},
	{
		async get() {
			const { start, end } = this.queryParams;

			const startDate = moment(start);
			const endDate = moment(end);

			checkDates(startDate, endDate);

			const extraQuery = await restrictQuery({ userId: this.userId });
			const result = await findAllConversationsBySourceCached({ start: startDate.toDate(), end: endDate.toDate(), extraQuery });

			return API.v1.success(result);
		},
	},
);

API.v1.addRoute(
	'livechat/analytics/dashboards/conversations-by-status',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-reports'],
		validateParams: isGETDashboardConversationsByType,
		license: ['livechat-enterprise'],
	},
	{
		async get() {
			const { start, end } = this.queryParams;

			const startDate = moment(start);
			const endDate = moment(end);

			checkDates(startDate, endDate);
			const extraQuery = await restrictQuery({ userId: this.userId });
			const result = await findAllConversationsByStatusCached({ start: startDate.toDate(), end: endDate.toDate(), extraQuery });

			return API.v1.success(result);
		},
	},
);

API.v1.addRoute(
	'livechat/analytics/dashboards/conversations-by-department',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-reports'],
		validateParams: isGETDashboardConversationsByType,
		license: ['livechat-enterprise'],
	},
	{
		async get() {
			const { start, end } = this.queryParams;
			const { sort } = await this.parseJsonQuery();

			const startDate = moment(start);
			const endDate = moment(end);

			checkDates(startDate, endDate);
			const extraQuery = await restrictQuery({ userId: this.userId });
			const result = await findAllConversationsByDepartmentCached({ start: startDate.toDate(), end: endDate.toDate(), sort, extraQuery });

			return API.v1.success(result);
		},
	},
);

API.v1.addRoute(
	'livechat/analytics/dashboards/conversations-by-tags',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-reports'],
		validateParams: isGETDashboardConversationsByType,
		license: ['livechat-enterprise'],
	},
	{
		async get() {
			const { start, end } = this.queryParams;
			const { sort } = await this.parseJsonQuery();

			const startDate = moment(start);
			const endDate = moment(end);

			checkDates(startDate, endDate);
			const extraQuery = await restrictQuery({ userId: this.userId });
			const result = await findAllConversationsByTagsCached({ start: startDate.toDate(), end: endDate.toDate(), sort, extraQuery });

			return API.v1.success(result);
		},
	},
);

API.v1.addRoute(
	'livechat/analytics/dashboards/conversations-by-agent',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-reports'],
		validateParams: isGETDashboardConversationsByType,
		license: ['livechat-enterprise'],
	},
	{
		async get() {
			const { start, end } = this.queryParams;
			const { sort } = await this.parseJsonQuery();

			const startDate = moment(start);
			const endDate = moment(end);

			checkDates(startDate, endDate);
			const extraQuery = await restrictQuery({ userId: this.userId });
			const result = await findAllConversationsByAgentsCached({ start: startDate.toDate(), end: endDate.toDate(), sort, extraQuery });

			return API.v1.success(result);
		},
	},
);

```