## File: packages/ui-contexts/src/hooks/useUserSubscriptionByName.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { UserContext } from '../UserContext';

export const useUserSubscriptionByName = (name: string): ISubscription | undefined => {
    /* Implementation Hidden */
};

```