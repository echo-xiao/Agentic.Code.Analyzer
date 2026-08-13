## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/onSaveVisitorInfo.ts

```typescript
import type { IOmnichannelRoom, IOmnichannelServiceLevelAgreements, IUser } from '@rocket.chat/core-typings';
import { OmnichannelServiceLevelAgreements } from '@rocket.chat/models';

import { callbacks } from '../../../../../server/lib/callbacks';
import { removePriorityFromRoom, updateRoomPriority } from '../../../../server/api/v1/omnichannel/lib/priorities';
import { removeRoomSLA, updateRoomSLA } from '../../../../server/api/v1/omnichannel/lib/sla';

const updateSLA = async (room: IOmnichannelRoom, user: Required<Pick<IUser, '_id' | 'username' | 'name'>>, slaId?: string) => {
    /* Implementation Hidden */
};

const updatePriority = async (room: IOmnichannelRoom, user: Required<Pick<IUser, '_id' | 'username' | 'name'>>, priorityId?: string) => {
    /* Implementation Hidden */
};

callbacks.add(
	'livechat.saveInfo',
	async (room, { user, oldRoom }: any) => {
		const { slaId: oldSlaId, priorityId: oldPriorityId } = oldRoom;
		const { slaId: newSlaId, priorityId: newPriorityId } = room;

		if (oldSlaId === newSlaId && oldPriorityId === newPriorityId) {
			return room;
		}
		if (oldSlaId === newSlaId && oldPriorityId !== newPriorityId) {
			await updatePriority(room, user, newPriorityId);
		} else if (oldSlaId !== newSlaId && oldPriorityId === newPriorityId) {
			await updateSLA(room, user, newSlaId);
		} else {
			await Promise.all([updateSLA(room, user, newSlaId), updatePriority(room, user, newPriorityId)]);
		}

		return room as any;
	},
	callbacks.priority.HIGH,
	'livechat-on-save-room-info',
);

```