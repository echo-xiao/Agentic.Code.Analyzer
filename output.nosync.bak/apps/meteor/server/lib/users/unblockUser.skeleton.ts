## File: apps/meteor/server/lib/users/unblockUser.ts

```typescript
import { Subscriptions } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnSubscriptionChangedByRoomIdAndUserIds } from '../../../app/lib/server/lib/notifyListener';

export const unblockUserMethod = async (userId: string, { rid, blocked }: { rid: string; blocked: string }): Promise<void> => {
    /* Implementation Hidden */
};

```