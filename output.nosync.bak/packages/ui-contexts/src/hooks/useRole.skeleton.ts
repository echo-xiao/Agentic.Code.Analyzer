## File: packages/ui-contexts/src/hooks/useRole.ts

```typescript
import type { ObjectId } from 'mongodb';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { AuthorizationContext } from '../AuthorizationContext';

export const useRole = (role: string | ObjectId): boolean => {
    /* Implementation Hidden */
};

```