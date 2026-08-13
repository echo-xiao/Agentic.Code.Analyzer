## File: apps/meteor/app/channel-settings/server/functions/saveRoomType.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { UpdateResult, Document } from 'mongodb';

import { RoomSettingsEnum } from '../../../../definition/IRoomTypeConfig';
import { i18n } from '../../../../server/lib/i18n';
import { roomCoordinator } from '../../../../server/lib/rooms/roomCoordinator';
import { notifyOnSubscriptionChangedByRoomId } from '../../../lib/server/lib/notifyListener';
import { settings } from '../../../settings/server';

export const saveRoomType = async function (
	rid: string,
	roomType: IRoom['t'],
	user: IUser,
	sendMessage = true,
): Promise<UpdateResult | Document> {
    /* Implementation Hidden */
};

```