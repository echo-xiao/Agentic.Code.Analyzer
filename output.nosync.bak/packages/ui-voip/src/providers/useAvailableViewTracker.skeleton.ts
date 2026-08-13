## File: packages/ui-voip/src/providers/useAvailableViewTracker.ts

```typescript
import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react';

import type { AvailableViews } from '../context/MediaCallInstanceContext';

const filter = (view: AvailableViews, _index: number, array: AvailableViews[]) => {
    /* Implementation Hidden */
};

const FLUSH_DELAY = 100;

const useAvailableViewTracker = () => {
    /* Implementation Hidden */
};

export default useAvailableViewTracker;

```