## File: apps/meteor/app/custom-sounds/server/lib/insertOrUpdateSound.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { CustomSounds } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import type { ICustomSoundData } from '../methods/insertOrUpdateSound';
import { RocketChatFileCustomSoundsInstance } from '../startup/custom-sounds';

export const insertOrUpdateSound = async (soundData: ICustomSoundData): Promise<string> => {
    /* Implementation Hidden */
};

```