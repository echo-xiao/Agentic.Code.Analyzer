## File: packages/ui-contexts/src/hooks/useUserPresence.ts

```typescript
import type { UserPresence } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { UserPresenceContext } from '../UserPresenceContext';

/**
 * Hook to fetch and subscribe user presence data
 *
 * @param uid - User Id
 * @returns status, statusText, username, name
 * @public
 */
export const useUserPresence = (uid: string | undefined): UserPresence | undefined => {
    /* Implementation Hidden */
};

```