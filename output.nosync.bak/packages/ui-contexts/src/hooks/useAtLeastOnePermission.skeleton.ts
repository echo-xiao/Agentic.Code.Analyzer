## File: packages/ui-contexts/src/hooks/useAtLeastOnePermission.ts

```typescript
import type { ObjectId } from 'mongodb';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { AuthorizationContext } from '../AuthorizationContext';

export const useAtLeastOnePermission = (permissions: (string | ObjectId)[], scope?: string | ObjectId): boolean => {
    /* Implementation Hidden */
};

```