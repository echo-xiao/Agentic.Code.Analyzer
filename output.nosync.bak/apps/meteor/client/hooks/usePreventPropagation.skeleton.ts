## File: apps/meteor/client/hooks/usePreventPropagation.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { UIEvent } from 'react';

export const usePreventPropagation = (fn?: (e: UIEvent) => void): ((e: UIEvent) => void) => {
    /* Implementation Hidden */
};

```