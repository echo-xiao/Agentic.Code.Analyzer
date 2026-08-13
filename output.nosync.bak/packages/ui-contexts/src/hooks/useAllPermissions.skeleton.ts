## File: packages/ui-contexts/src/hooks/useAllPermissions.ts

```typescript
import type { ObjectId } from 'mongodb';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { AuthorizationContext } from '../AuthorizationContext';

export const useAllPermissions = (permissions: (string | ObjectId)[], scope?: string | ObjectId): boolean => {
    /* Implementation Hidden */
};

```