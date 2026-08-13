## File: apps/meteor/server/lib/omnichannel/closeOmnichannelConversations.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';

import { closeRoom } from '../../../app/livechat/server/lib/closeRoom';
import { settings } from '../../../app/settings/server';
import { callbacks } from '../callbacks';
import { i18n } from '../i18n';

type SubscribedRooms = {
	rid: string;
	t: string;
};

export const closeOmnichannelConversations = async (
	user: IUser,
	subscribedRooms: SubscribedRooms[],
	executedBy?: string,
): Promise<void> => {
    /* Implementation Hidden */
};

```