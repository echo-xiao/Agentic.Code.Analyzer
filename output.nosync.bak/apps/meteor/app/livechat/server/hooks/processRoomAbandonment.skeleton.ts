## File: apps/meteor/app/livechat/server/hooks/processRoomAbandonment.ts

```typescript
import type { IOmnichannelRoom, IMessage, IBusinessHourWorkHour, ILivechatDepartment } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatBusinessHours, LivechatDepartment, Messages, LivechatRooms } from '@rocket.chat/models';
import moment from 'moment';

import { callbacks } from '../../../../server/lib/callbacks';
import { settings } from '../../../settings/server';
import { businessHourManager } from '../business-hour';
import type { CloseRoomParams } from '../lib/localTypes';

export const getSecondsWhenOfficeHoursIsDisabled = (room: IOmnichannelRoom, agentLastMessage: IMessage) =>
	moment(new Date(room.closedAt || new Date())).diff(moment(new Date(agentLastMessage.ts)), 'seconds');

export const parseDays = (
	acc: Record<string, { start: { day: string; time: string }; finish: { day: string; time: string }; open: boolean }>,
	day: IBusinessHourWorkHour,
) => {
    /* Implementation Hidden */
};

export const getSecondsSinceLastAgentResponse = async (room: IOmnichannelRoom, agentLastMessage: IMessage) => {
    /* Implementation Hidden */
};

export const onCloseRoom = async (params: { room: IOmnichannelRoom; options: CloseRoomParams['options'] }) => {
    /* Implementation Hidden */
};

callbacks.add('livechat.closeRoom', onCloseRoom, callbacks.priority.HIGH, 'process-room-abandonment');

```