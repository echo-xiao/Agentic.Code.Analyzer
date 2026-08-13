## File: apps/meteor/app/custom-sounds/server/lib/uploadCustomSound.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { RequiredField } from '@rocket.chat/core-typings';
import { CustomSounds } from '@rocket.chat/models';

import { RocketChatFile } from '../../../file/server';
import type { ICustomSoundData } from '../methods/insertOrUpdateSound';
import { RocketChatFileCustomSoundsInstance } from '../startup/custom-sounds';

export const uploadCustomSound = async (
	buffer: Buffer,
	contentType: string,
	soundData: RequiredField<ICustomSoundData, '_id'>,
): Promise<void> => {
    /* Implementation Hidden */
};

```