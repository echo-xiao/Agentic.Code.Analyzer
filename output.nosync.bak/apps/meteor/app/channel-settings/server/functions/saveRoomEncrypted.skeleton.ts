## File: apps/meteor/app/channel-settings/server/functions/saveRoomEncrypted.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { isRegisterUser } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { UpdateResult } from 'mongodb';

import { notifyOnSubscriptionChangedByRoomId } from '../../../lib/server/lib/notifyListener';

export const saveRoomEncrypted = async function (rid: string, encrypted: boolean, user: IUser, sendMessage = true): Promise<UpdateResult> {
    /* Implementation Hidden */
};

```