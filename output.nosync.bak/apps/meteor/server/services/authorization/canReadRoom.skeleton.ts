## File: apps/meteor/server/services/authorization/canReadRoom.ts

```typescript
import type { RoomAccessValidator } from '@rocket.chat/core-services';
import { Authorization } from '@rocket.chat/core-services';
import { Subscriptions, Users } from '@rocket.chat/models';

import { canAccessRoom, isPartialUser } from './canAccessRoom';

export const canReadRoom: RoomAccessValidator = async (...args) => {
    /* Implementation Hidden */
};

```