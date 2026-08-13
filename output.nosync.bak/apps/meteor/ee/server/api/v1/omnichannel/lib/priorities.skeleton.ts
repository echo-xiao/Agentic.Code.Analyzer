## File: apps/meteor/ee/server/api/v1/omnichannel/lib/priorities.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { ILivechatPriority, IOmnichannelRoom, IUser } from '@rocket.chat/core-typings';
import { LivechatInquiry, LivechatPriority, LivechatRooms } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { FindOptions } from 'mongodb';

import { notifyOnLivechatInquiryChangedByRoom, notifyOnRoomChanged } from '../../../../../../app/lib/server/lib/notifyListener';
import { logger } from '../../../../../app/livechat-enterprise/server/lib/logger';

type FindPriorityParams = {
	text?: string;
	pagination: {
		offset: number;
		count: number;
		sort: FindOptions<ILivechatPriority>['sort'];
	};
};

export async function findPriority({
	text,
	pagination: { offset, count, sort },
}: FindPriorityParams): Promise<PaginatedResult<{ priorities: ILivechatPriority[] }>> {
    /* Implementation Hidden */
}

export async function updatePriority(_id: string, data: Pick<ILivechatPriority, 'name'> & { reset?: boolean }): Promise<ILivechatPriority> {
    /* Implementation Hidden */
}

export const updateRoomPriority = async (
	rid: string,
	user: Required<Pick<IUser, '_id' | 'username' | 'name'>>,
	priorityId: string,
): Promise<void> => {
    /* Implementation Hidden */
};

export const removePriorityFromRoom = async (rid: string, user: Required<Pick<IUser, '_id' | 'username' | 'name'>>): Promise<void> => {
    /* Implementation Hidden */
};

const addPriorityChangeHistoryToRoom = async (
	roomId: string,
	user: Required<Pick<IUser, '_id' | 'username' | 'name'>>,
	priority?: Pick<ILivechatPriority, 'name' | 'i18n'>,
) => {
    /* Implementation Hidden */
};

```