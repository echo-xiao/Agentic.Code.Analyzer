## File: apps/meteor/ee/app/canned-responses/server/methods/removeCannedResponse.ts

```typescript
import { CannedResponse } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import notifications from '../../../../../app/notifications/server/lib/Notifications';
import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';

export const removeCannedResponse = async (uid: string, _id: string): Promise<void> => {
    /* Implementation Hidden */
};

```