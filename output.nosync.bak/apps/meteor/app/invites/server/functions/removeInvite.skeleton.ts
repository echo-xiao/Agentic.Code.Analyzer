## File: apps/meteor/app/invites/server/functions/removeInvite.ts

```typescript
import type { IInvite } from '@rocket.chat/core-typings';
import { Invites } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';

export const removeInvite = async (userId: string, invite: Pick<IInvite, '_id'>) => {
    /* Implementation Hidden */
};

```