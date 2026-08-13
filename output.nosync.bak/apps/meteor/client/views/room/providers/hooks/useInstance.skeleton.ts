## File: apps/meteor/client/views/room/providers/hooks/useInstance.ts

```typescript
import { useRef, useEffect } from 'react';

import { useDepsMatch } from './useDepsMatch';

export function useInstance<T>(factory: () => [instance: T, release?: () => void], deps: unknown[]): T {
    /* Implementation Hidden */
}

```