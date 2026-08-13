## File: packages/ui-voip/src/context/usePeekMediaSessionPeerInfo.ts

```typescript
import { useCallback, useRef, useSyncExternalStore } from 'react';

import { useMediaCallInstance } from './MediaCallInstanceContext';
import type { PeerInfo } from './definitions';
import { derivePeerInfoFromInstanceState } from '../utils/derivePeerInfoFromInstanceState';

const areEqual = (a: PeerInfo, b: PeerInfo) => {
    /* Implementation Hidden */
};

export const usePeekMediaSessionPeerInfo = (): PeerInfo | undefined => {
    /* Implementation Hidden */
};

```