## File: apps/meteor/app/custom-sounds/server/lib/deleteCustomSound.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { CustomSounds } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { RocketChatFileCustomSoundsInstance } from '../startup/custom-sounds';

export const deleteCustomSound = async (_id: string): Promise<void> => {
    /* Implementation Hidden */
};

```