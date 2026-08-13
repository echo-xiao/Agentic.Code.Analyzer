## File: packages/ui-voip/src/context/usePeekMediaSessionState.ts

```typescript
import { useCallback, useSyncExternalStore } from 'react';

import { useMediaCallInstance } from './MediaCallInstanceContext';
import { deriveWidgetStateFromCallState } from '../utils/deriveWidgetStateFromCallState';

export type PeekMediaSessionStateReturn = 'unavailable' | 'available' | 'ongoing' | 'ringing' | 'calling';

export const usePeekMediaSessionState = (): PeekMediaSessionStateReturn => {
    /* Implementation Hidden */
};

```