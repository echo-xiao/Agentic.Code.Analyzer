## File: packages/ui-contexts/src/hooks/useUserRoom.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useContext, useMemo, useSyncExternalStore } from 'react';

import type { Fields } from '../UserContext';
import { UserContext } from '../UserContext';

export const useUserRoom = (rid: string, fields?: Fields): IRoom | undefined => {
    /* Implementation Hidden */
};

```