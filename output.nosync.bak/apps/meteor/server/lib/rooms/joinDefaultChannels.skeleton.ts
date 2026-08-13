## File: apps/meteor/server/lib/rooms/joinDefaultChannels.ts

```typescript
import { Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { addUserToDefaultChannels } from './addUserToDefaultChannels';

export const joinDefaultChannels = async (userId: string, silenced?: boolean): Promise<void> => {
    /* Implementation Hidden */
};

```