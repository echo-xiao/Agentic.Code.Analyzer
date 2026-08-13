## File: apps/meteor/app/channel-settings/server/functions/saveRoomTopic.ts

```typescript
import { Message, Room } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { callbacks } from '../../../../server/lib/callbacks';

export const saveRoomTopic = async (
	rid: string,
	roomTopic: string | undefined,
	user: Pick<IUser, 'username' | '_id' | 'federation' | 'federated'>,
	sendMessage = true,
) => {
    /* Implementation Hidden */
};

```