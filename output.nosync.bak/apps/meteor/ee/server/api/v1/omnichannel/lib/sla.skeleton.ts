## File: apps/meteor/ee/server/api/v1/omnichannel/lib/sla.ts

```typescript
import type { IOmnichannelServiceLevelAgreements, IUser } from '@rocket.chat/core-typings';
import { OmnichannelServiceLevelAgreements } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { FindOptions } from 'mongodb';

import {
	addSlaChangeHistoryToRoom,
	removeInquiryQueueSla,
	removeSlaFromRoom,
	updateInquiryQueueSla,
	updateRoomSlaWeights,
} from '../../../../../app/livechat-enterprise/server/lib/SlaHelper';

type FindSLAParams = {
	text?: string;
	pagination: {
		offset: number;
		count: number;
		sort: FindOptions<IOmnichannelServiceLevelAgreements>['sort'];
	};
};

export async function findSLA({
	text,
	pagination: { offset, count, sort },
}: FindSLAParams): Promise<PaginatedResult<{ sla: IOmnichannelServiceLevelAgreements[] }>> {
    /* Implementation Hidden */
}

export const updateRoomSLA = async (
	roomId: string,
	user: Required<Pick<IUser, '_id' | 'username' | 'name'>>,
	sla: Pick<IOmnichannelServiceLevelAgreements, '_id' | 'name' | 'dueTimeInMinutes'>,
) => {
    /* Implementation Hidden */
};

export const removeRoomSLA = async (roomId: string, user: Required<Pick<IUser, '_id' | 'username' | 'name'>>) => {
    /* Implementation Hidden */
};

```