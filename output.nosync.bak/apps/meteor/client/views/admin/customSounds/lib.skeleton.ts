## File: apps/meteor/client/views/admin/customSounds/lib.ts

```typescript
import { CUSTOM_SOUND_ALLOWED_MIME_TYPES } from '../../../../lib/constants';

type ClientCustomSoundData = {
	_id?: string;
	name: string;
};

// Here previousData will define if it is an update or a new entry
export function validate(soundData: ClientCustomSoundData, soundFile?: File): ('Name' | 'Sound File' | 'FileType')[] {
    /* Implementation Hidden */
}

```