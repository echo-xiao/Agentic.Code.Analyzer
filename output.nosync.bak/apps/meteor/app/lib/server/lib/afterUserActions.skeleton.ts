## File: apps/meteor/app/lib/server/lib/afterUserActions.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Subscriptions } from '@rocket.chat/models';

import { notifyOnSubscriptionChangedByUserId } from './notifyListener';
import { callbacks } from '../../../../server/lib/callbacks';
import { unarchiveUserSubscriptions } from '../../../../server/lib/users/unarchiveUserSubscriptions';

const handleDeactivateUser = async (user: IUser): Promise<void> => {
    /* Implementation Hidden */
};

const handleActivateUser = async (user: IUser): Promise<void> => {
    /* Implementation Hidden */
};

callbacks.add('afterDeactivateUser', handleDeactivateUser, callbacks.priority.LOW, 'subscription-archive-on-deactivate');

callbacks.add('afterActivateUser', handleActivateUser, callbacks.priority.LOW, 'subscription-unarchive-on-activate');

```