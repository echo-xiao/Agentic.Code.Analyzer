## File: packages/ui-contexts/src/hooks/useUserPreference.ts

```typescript
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { UserContext } from '../UserContext';

export const useUserPreference = <T>(key: string, defaultValue?: T): T | undefined => {
    /* Implementation Hidden */
};

```