## File: apps/meteor/app/channel-settings/server/functions/saveRoomName.ts

```typescript
import { Message, Room } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { isRoomNativeFederated } from '@rocket.chat/core-typings';
import { Integrations, Rooms, Subscriptions } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import type { Document, UpdateResult } from 'mongodb';

import { callbacks } from '../../../../server/lib/callbacks';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { checkUsernameAvailability } from '../../../../server/lib/users/checkUsernameAvailability';
import { notifyOnIntegrationChangedByChannels, notifyOnSubscriptionChangedByRoomId } from '../../../lib/server/lib/notifyListener';
import { getValidRoomName } from '../../../utils/server/lib/getValidRoomName';

const updateFName = async (rid: string, displayName: string): Promise<(UpdateResult | Document)[]> => {
    /* Implementation Hidden */
};

const updateRoomName = async (rid: string, displayName: string, slugifiedRoomName: string) => {
    /* Implementation Hidden */
};

export async function saveRoomName(
	rid: string,
	displayName: string | undefined,
	user: IUser,
	sendMessage = true,
): Promise<string | undefined> {
    /* Implementation Hidden */
}

```