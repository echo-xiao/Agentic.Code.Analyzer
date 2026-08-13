## File: apps/meteor/server/services/omnichannel-analytics/AgentData.ts

```typescript
/* eslint-disable new-cap */
import type { ConversationData } from '@rocket.chat/core-services';
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import type { ILivechatRoomsModel } from '@rocket.chat/model-typings';
import type moment from 'moment';
import type { Filter } from 'mongodb';

import { secondsToHHMMSS } from '../../../lib/utils/secondsToHHMMSS';

type AgentOverviewValidActions =
	| 'Total_conversations'
	| 'Avg_chat_duration'
	| 'Total_messages'
	| 'Avg_first_response_time'
	| 'Best_first_response_time'
	| 'Avg_response_time'
	| 'Avg_reaction_time';

export class AgentOverviewData {
	constructor(private readonly roomsModel: ILivechatRoomsModel) {
        /* Implementation Hidden */
    }

	updateMap<K>(map: Map<K, number>, key: K, value: number) {
        /* Implementation Hidden */
    }

	sortByValue(data: { value: string }[], inv = false) {
        /* Implementation Hidden */
    }

	isActionAllowed(action: string | undefined): action is AgentOverviewValidActions {
        /* Implementation Hidden */
    }

	callAction<T extends AgentOverviewValidActions>(action: T, ...args: [moment.Moment, moment.Moment, string?, Filter<IOmnichannelRoom>?]) {
        /* Implementation Hidden */
    }

	async Total_conversations(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_chat_duration(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Total_messages(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_first_response_time(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Best_first_response_time(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_response_time(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_reaction_time(from: moment.Moment, to: moment.Moment, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }
}

```