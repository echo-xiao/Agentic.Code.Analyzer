## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/resumeOnHold.ts

```typescript
import { OmnichannelEEService } from '@rocket.chat/core-services';
import type { ILivechatVisitor, IMessage, IOmnichannelRoom, IUser } from '@rocket.chat/core-typings';
import { isMessageFromVisitor, isEditedMessage } from '@rocket.chat/core-typings';
import { LivechatRooms, LivechatVisitors, Users } from '@rocket.chat/models';

import { callbackLogger } from '../../../../../app/livechat/server/lib/logger';
import { callbacks } from '../../../../../server/lib/callbacks';
import { i18n } from '../../../../../server/lib/i18n';

const resumeOnHoldCommentAndUser = async (room: IOmnichannelRoom): Promise<{ comment: string; resumedBy: IUser }> => {
    /* Implementation Hidden */
};

callbacks.add(
	'afterOmnichannelSaveMessage',
	async (message: IMessage, { room }) => {
		if (isEditedMessage(message) || message.t) {
			return message;
		}

		const { _id: rid, v: roomVisitor } = room;

		if (!roomVisitor?._id) {
			return message;
		}

		// Need to read the room every time, the room object is not updated
		const updatedRoom = await LivechatRooms.findOneById(rid);
		if (!updatedRoom) {
			return message;
		}

		if (isMessageFromVisitor(message) && room.onHold) {
			callbackLogger.debug({ msg: '[afterOmnichannelSaveMessage] Room is on hold, resuming it now since visitor sent a message', rid });

			try {
				const { comment: resumeChatComment, resumedBy } = await resumeOnHoldCommentAndUser(updatedRoom);
				await OmnichannelEEService.resumeRoomOnHold(updatedRoom, resumeChatComment, resumedBy);
			} catch (error) {
				callbackLogger.error({ msg: '[afterOmnichannelSaveMessage] Error while resuming room on hold', rid, err: error });
				return message;
			}
		}

		return message;
	},
	callbacks.priority.HIGH,
	'livechat-resume-on-hold',
);

```