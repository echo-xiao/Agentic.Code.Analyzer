## File: packages/ui-voip/src/providers/useGetAutocompleteOptions.ts

```typescript
import type { MediaSignalingSession } from '@rocket.chat/media-signaling';
import { useEndpoint, useSetting, useUser, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { getExtensionFromInstanceContact } from './useMediaSession';

export const useGetAutocompleteOptions = (instance: MediaSignalingSession | undefined) => {
    /* Implementation Hidden */
};

```