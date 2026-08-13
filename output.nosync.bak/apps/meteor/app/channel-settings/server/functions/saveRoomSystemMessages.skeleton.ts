## File: apps/meteor/app/channel-settings/server/functions/saveRoomSystemMessages.ts

```typescript
import type { MessageTypesValues } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { MessageTypesValues as messageTypesValues } from '../../../lib/lib/MessageTypes';

export const saveRoomSystemMessages = async function (rid: string, systemMessages: MessageTypesValues[]) {
    /* Implementation Hidden */
};

```