## File: apps/meteor/server/lib/omnichannel/closeLivechatRoom.ts

```typescript
import type { IUser, IRoom, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms, Subscriptions } from '@rocket.chat/models';

import { closeRoom } from '../../../app/livechat/server/lib/closeRoom';
import type { CloseRoomParams } from '../../../app/livechat/server/lib/localTypes';
import { hasPermissionAsync } from '../authorization/hasPermission';

export const closeLivechatRoom = async (
	user: IUser,
	roomId: IRoom['_id'],
	{
		comment,
		tags,
		generateTranscriptPdf,
		transcriptEmail,
		forceClose = false,
	}: {
		comment?: string;
		tags?: string[];
		generateTranscriptPdf?: boolean;
		transcriptEmail?:
			| {
					sendToVisitor: false;
			  }
			| {
					sendToVisitor: true;
					requestData: Pick<NonNullable<IOmnichannelRoom['transcriptRequest']>, 'email' | 'subject'>;
			  };
		forceClose?: boolean;
	},
): Promise<void> => {
    /* Implementation Hidden */
};

```