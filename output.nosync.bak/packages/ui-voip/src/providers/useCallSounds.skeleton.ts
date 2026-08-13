## File: packages/ui-voip/src/providers/useCallSounds.ts

```typescript
import { useCustomSound } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import type { State } from '../context/definitions';

export const useCallSounds = (state: State, subscribeCallEnded: (callback: () => void) => (() => void) | undefined) => {
    /* Implementation Hidden */
};

```