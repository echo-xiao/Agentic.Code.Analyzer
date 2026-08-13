## File: apps/meteor/server/services/omnichannel-analytics/ChartData.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import type { ILivechatRoomsModel } from '@rocket.chat/model-typings';
import type { Filter } from 'mongodb';

/* eslint-disable new-cap */
type ChartDataValidActions =
	| 'Total_conversations'
	| 'Avg_chat_duration'
	| 'Total_messages'
	| 'Avg_first_response_time'
	| 'Avg_reaction_time'
	| 'Best_first_response_time'
	| 'Avg_response_time';

type DateParam = {
	gte: Date;
	lte: Date;
};

export class ChartData {
	constructor(private readonly roomsModel: ILivechatRoomsModel) {
        /* Implementation Hidden */
    }

	isActionAllowed(action: string | undefined): action is ChartDataValidActions {
        /* Implementation Hidden */
    }

	callAction<T extends ChartDataValidActions>(action: T, ...args: [DateParam, string?, Filter<IOmnichannelRoom>?]) {
        /* Implementation Hidden */
    }

	async Total_conversations(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_chat_duration(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Total_messages(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_first_response_time(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Best_first_response_time(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_response_time(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }

	async Avg_reaction_time(date: DateParam, departmentId?: string, extraQuery: Filter<IOmnichannelRoom> = {}) {
        /* Implementation Hidden */
    }
}

```