## File: apps/meteor/app/livechat/server/hooks/sendEmailTranscriptOnClose.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';

import { callbacks } from '../../../../server/lib/callbacks';
import type { CloseRoomParams } from '../lib/localTypes';
import { sendTranscript } from '../lib/sendTranscript';

type LivechatCloseCallbackParams = {
	room: IOmnichannelRoom;
	options: CloseRoomParams['options'];
};

const sendEmailTranscriptOnClose = async (params: LivechatCloseCallbackParams): Promise<LivechatCloseCallbackParams> => {
    /* Implementation Hidden */
};

const resolveTranscriptData = (
	room: IOmnichannelRoom,
	options: LivechatCloseCallbackParams['options'] = {},
): IOmnichannelRoom['transcriptRequest'] | undefined => {
    /* Implementation Hidden */
};

callbacks.add('livechat.closeRoom', sendEmailTranscriptOnClose, callbacks.priority.HIGH, 'livechat-send-email-transcript-on-close-room');

```