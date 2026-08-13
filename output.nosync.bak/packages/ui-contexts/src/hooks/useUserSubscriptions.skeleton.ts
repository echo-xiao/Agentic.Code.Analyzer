## File: packages/ui-contexts/src/hooks/useUserSubscriptions.ts

```typescript
import { useContext, useMemo, useSyncExternalStore } from 'react';

import type { FindOptions, SubscriptionQuery } from '../UserContext';
import { UserContext } from '../UserContext';
import type { SubscriptionWithRoom } from '../types/SubscriptionWithRoom';

export const useUserSubscriptions = (query: SubscriptionQuery, options?: FindOptions): SubscriptionWithRoom[] => {
    /* Implementation Hidden */
};

```