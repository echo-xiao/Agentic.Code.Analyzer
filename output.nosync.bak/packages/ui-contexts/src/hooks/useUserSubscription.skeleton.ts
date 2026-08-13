## File: packages/ui-contexts/src/hooks/useUserSubscription.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { UserContext } from '../UserContext';

export const useUserSubscription = (rid: string): ISubscription | undefined => {
    /* Implementation Hidden */
};

```