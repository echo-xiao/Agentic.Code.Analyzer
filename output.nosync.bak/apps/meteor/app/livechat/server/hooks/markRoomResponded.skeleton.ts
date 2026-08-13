## File: apps/meteor/app/livechat/server/hooks/markRoomResponded.ts

```typescript
import type { IOmnichannelRoom, IMessage } from '@rocket.chat/core-typings';
import { isEditedMessage, isMessageFromVisitor, isSystemMessage } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { LivechatRooms, LivechatContacts, LivechatInquiry } from '@rocket.chat/models';
import moment from 'moment';

import { callbacks } from '../../../../server/lib/callbacks';
import { notifyOnLivechatInquiryChanged } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';
import { isMessageFromBot } from '../lib/isMessageFromBot';

export async function markRoomResponded(
	message: IMessage,
	room: IOmnichannelRoom,
	roomUpdater: Updater<IOmnichannelRoom>,
): Promise<IOmnichannelRoom['responseBy'] | undefined> {
    /* Implementation Hidden */
}

callbacks.add(
	'afterOmnichannelSaveMessage',
	async (message, { room, roomUpdater }) => {
		if (!message || isEditedMessage(message) || isMessageFromVisitor(message) || isSystemMessage(message)) {
			return;
		}

		await markRoomResponded(message, room, roomUpdater);
	},
	callbacks.priority.HIGH,
	'markRoomResponded',
);

```