## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/onCloseLivechat.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';

import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';
import { AutoCloseOnHoldScheduler } from '../lib/AutoCloseOnHoldScheduler';
import { debouncedDispatchWaitingQueueStatus } from '../lib/Helper';

type LivechatCloseCallbackParams = {
	room: IOmnichannelRoom;
};

const onCloseLivechat = async (params: LivechatCloseCallbackParams) => {
    /* Implementation Hidden */
};

callbacks.add(
	'livechat.closeRoom',
	(params: LivechatCloseCallbackParams) => onCloseLivechat(params),
	callbacks.priority.HIGH,
	'livechat-on-close-livechat-remove-on-hold-and-dispatch-waiting-queue',
);

```