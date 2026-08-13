## File: apps/meteor/ee/app/livechat-enterprise/server/lib/SlaHelper.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IOmnichannelServiceLevelAgreements, IUser } from '@rocket.chat/core-typings';
import { LivechatInquiry, LivechatRooms } from '@rocket.chat/models';

import {
	notifyOnRoomChangedById,
	notifyOnLivechatInquiryChangedByRoom,
	notifyOnLivechatInquiryChanged,
} from '../../../../../app/lib/server/lib/notifyListener';
import { callbacks } from '../../../../../server/lib/callbacks';

export const removeSLAFromRooms = async (slaId: string, userId: string) => {
    /* Implementation Hidden */
};

export const updateInquiryQueueSla = async (roomId: string, sla: Pick<IOmnichannelServiceLevelAgreements, 'dueTimeInMinutes' | '_id'>) => {
    /* Implementation Hidden */
};

export const updateRoomSlaWeights = async (roomId: string, sla: Pick<IOmnichannelServiceLevelAgreements, 'dueTimeInMinutes' | '_id'>) => {
    /* Implementation Hidden */
};

export const removeInquiryQueueSla = async (roomId: string) => {
    /* Implementation Hidden */
};

export const removeSlaFromRoom = async (roomId: string) => {
    /* Implementation Hidden */
};

export const addSlaChangeHistoryToRoom = async (
	roomId: string,
	user: Pick<IUser, '_id' | 'name' | 'username'>,
	sla?: Pick<IOmnichannelServiceLevelAgreements, 'name'>,
) => {
    /* Implementation Hidden */
};

```