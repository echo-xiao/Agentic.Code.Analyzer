## File: apps/meteor/server/services/omnichannel-analytics/service.ts

```typescript
/* eslint-disable new-cap */
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type {
	AgentOverviewDataOptions,
	AnalyticsOverviewDataOptions,
	ChartDataOptions,
	IOmnichannelAnalyticsService,
} from '@rocket.chat/core-services';
import { LivechatRooms } from '@rocket.chat/models';
import moment from 'moment-timezone';

import { AgentOverviewData } from './AgentData';
import { ChartData } from './ChartData';
import { OverviewData } from './OverviewData';
import { serviceLogger } from './logger';
import { dayIterator } from './utils';
import { getTimezone } from '../../../app/utils/server/lib/getTimezone';
import { callbacks } from '../../lib/callbacks';
import { i18n } from '../../lib/i18n';

const HOURS_IN_DAY = 24;

// TODO: move EE analytics to this service & remove callback usage
export class OmnichannelAnalyticsService extends ServiceClassInternal implements IOmnichannelAnalyticsService {
	protected name = 'omnichannel-analytics';

	readonly overview: OverviewData;

	readonly chart: ChartData;

	readonly agentOverview: AgentOverviewData;

	constructor() {
        /* Implementation Hidden */
    }

	async getAgentOverviewData(options: AgentOverviewDataOptions) {
        /* Implementation Hidden */
    }

	async getAnalyticsChartData(options: ChartDataOptions) {
        /* Implementation Hidden */
    }

	async getAnalyticsOverviewData(options: AnalyticsOverviewDataOptions) {
        /* Implementation Hidden */
    }
}

```