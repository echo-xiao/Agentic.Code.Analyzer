## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/setPredictedVisitorAbandonmentTime.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isEditedMessage, isMessageFromVisitor } from '@rocket.chat/core-typings';
import moment from 'moment';

import { markRoomResponded } from '../../../../../app/livechat/server/hooks/markRoomResponded';
import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';
import { setPredictedVisitorAbandonmentTime } from '../lib/Helper';

function shouldSaveInactivity(message: IMessage): boolean {
    /* Implementation Hidden */
}

callbacks.remove('afterOmnichannelSaveMessage', 'markRoomResponded');

callbacks.add(
	'afterOmnichannelSaveMessage',
	async (message, { room, roomUpdater }) => {
		const responseBy = await markRoomResponded(message, room, roomUpdater);

		if (!shouldSaveInactivity(message)) {
			return message;
		}

		if (!responseBy) {
			return;
		}

		if (moment(responseBy.firstResponseTs).isSame(moment(message.ts))) {
			await setPredictedVisitorAbandonmentTime({ ...room, responseBy }, roomUpdater);
		}
	},
	callbacks.priority.MEDIUM,
	'save-visitor-inactivity',
);

```