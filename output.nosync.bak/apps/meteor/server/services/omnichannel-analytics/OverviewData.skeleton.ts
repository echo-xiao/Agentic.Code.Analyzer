## File: apps/meteor/server/services/omnichannel-analytics/OverviewData.ts

```typescript
/* eslint-disable new-cap */
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import type { ILivechatRoomsModel } from '@rocket.chat/model-typings';
import moment from 'moment-timezone';
import type { Filter } from 'mongodb';

import { secondsToHHMMSS } from '../../../lib/utils/secondsToHHMMSS';

type OverviewDataValidActions = 'Conversations' | 'Productivity';

export class OverviewData {
	constructor(private readonly roomsModel: ILivechatRoomsModel) {
        /* Implementation Hidden */
    }

	isActionAllowed(action: string | undefined): action is OverviewDataValidActions {
        /* Implementation Hidden */
    }

	callAction<T extends OverviewDataValidActions>(
		action: T,
		...args: [moment.Moment, moment.Moment, string?, string?, ((v: string) => string)?, Filter<IOmnichannelRoom>?]
	) {
        /* Implementation Hidden */
    }

	getKeyHavingMaxValue<T>(map: Map<T, number>, def: T): T {
        /* Implementation Hidden */
    }

	sumAllMapKeys<T>(map: Map<T, number>): number {
        /* Implementation Hidden */
    }

	getBusiestDay(map: Map<string, Map<string, number>>): string {
        /* Implementation Hidden */
    }

	getAllMapKeysSize<T>(map: Map<T, Map<T, number>>): number {
        /* Implementation Hidden */
    }

	async Conversations(
		from: moment.Moment,
		to: moment.Moment,
		departmentId?: string,
		timezone = 'UTC',
		t = (v: string): string => v,
		extraQuery: Filter<IOmnichannelRoom> = {},
	) {
        /* Implementation Hidden */
    }

	async Productivity(
		from: moment.Moment,
		to: moment.Moment,
		departmentId?: string,
		_timezone?: string,
		_t = (v: string): string => v,
		extraQuery?: Filter<IOmnichannelRoom>,
	) {
        /* Implementation Hidden */
    }
}

```