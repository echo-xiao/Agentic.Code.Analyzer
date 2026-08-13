## File: apps/meteor/client/hooks/useUserSoundPreferences.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';

const relativeVolume = (volume: number, masterVolume: number) => (volume * masterVolume) / 100;

export const useUserSoundPreferences = () => {
    /* Implementation Hidden */
};

```