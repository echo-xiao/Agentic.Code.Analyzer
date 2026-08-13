## File: packages/ui-contexts/src/hooks/useLogout.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useContext } from 'react';

import { UserContext } from '../UserContext';
import { useRouter } from './useRouter';

export const useLogout = (): (() => void) => {
    /* Implementation Hidden */
};

```