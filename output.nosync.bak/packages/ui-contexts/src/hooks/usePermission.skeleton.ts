## File: packages/ui-contexts/src/hooks/usePermission.ts

```typescript
import type { ObjectId } from 'mongodb';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { AuthorizationContext } from '../AuthorizationContext';

export const usePermission = (permission: string | ObjectId, scope?: string | ObjectId): boolean => {
    /* Implementation Hidden */
};

```