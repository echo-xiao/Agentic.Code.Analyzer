## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/sendPdfTranscriptOnClose.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';

import type { CloseRoomParams } from '../../../../../app/livechat/server/lib/localTypes';
import { callbacks } from '../../../../../server/lib/callbacks';
import { requestPdfTranscript } from '../lib/requestPdfTranscript';

type LivechatCloseCallbackParams = {
	room: IOmnichannelRoom;
	options: CloseRoomParams['options'];
};

const sendPdfTranscriptOnClose = async (params: LivechatCloseCallbackParams): Promise<LivechatCloseCallbackParams> => {
    /* Implementation Hidden */
};

callbacks.add('livechat.closeRoom', sendPdfTranscriptOnClose, callbacks.priority.HIGH, 'livechat-send-pdf-transcript-on-close-room');

```