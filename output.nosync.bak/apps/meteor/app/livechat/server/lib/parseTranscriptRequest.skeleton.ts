## File: apps/meteor/app/livechat/server/lib/parseTranscriptRequest.ts

```typescript
import type { ILivechatVisitor, IOmnichannelRoom, IUser } from '@rocket.chat/core-typings';
import { LivechatVisitors, Users } from '@rocket.chat/models';

import type { CloseRoomParams } from './localTypes';
import { settings } from '../../../settings/server';

export const parseTranscriptRequest = async (
	room: IOmnichannelRoom,
	options: CloseRoomParams['options'],
	visitor?: ILivechatVisitor,
	user?: IUser,
): Promise<CloseRoomParams['options']> => {
    /* Implementation Hidden */
};

```