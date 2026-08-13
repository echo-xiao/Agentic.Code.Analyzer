## File: packages/ui-voip/src/context/usePeekMediaSessionFeatures.ts

```typescript
import type { CallFeature } from '@rocket.chat/media-signaling';
import { useCallback, useRef, useSyncExternalStore } from 'react';

import { useMediaCallInstance } from './MediaCallInstanceContext';

export type PeekMediaSessionFeaturesReturn = readonly CallFeature[];

const areEqual = (a: PeekMediaSessionFeaturesReturn, b: PeekMediaSessionFeaturesReturn) => {
    /* Implementation Hidden */
};

const emptyFeatures: PeekMediaSessionFeaturesReturn = [];

export const usePeekMediaSessionFeatures = (): PeekMediaSessionFeaturesReturn => {
    /* Implementation Hidden */
};

```