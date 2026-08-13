## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/afterOnHoldChatResumed.ts

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';

import { callbacks } from '../../../../../server/lib/callbacks';
import { AutoCloseOnHoldScheduler } from '../lib/AutoCloseOnHoldScheduler';
import { cbLogger } from '../lib/logger';

type IRoom = Pick<IOmnichannelRoom, '_id'>;

const handleAfterOnHoldChatResumed = async (room: IRoom): Promise<IRoom> => {
    /* Implementation Hidden */
};

callbacks.add(
	'livechat:afterOnHoldChatResumed',
	handleAfterOnHoldChatResumed,
	callbacks.priority.HIGH,
	'livechat-after-on-hold-chat-resumed',
);

```