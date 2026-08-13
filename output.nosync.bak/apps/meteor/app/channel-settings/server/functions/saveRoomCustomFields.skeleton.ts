## File: apps/meteor/app/channel-settings/server/functions/saveRoomCustomFields.ts

```typescript
import { Rooms, Subscriptions } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { UpdateResult } from 'mongodb';

import { notifyOnSubscriptionChangedByRoomId } from '../../../lib/server/lib/notifyListener';

export const saveRoomCustomFields = async function (rid: string, roomCustomFields: Record<string, any>): Promise<UpdateResult> {
    /* Implementation Hidden */
};

```