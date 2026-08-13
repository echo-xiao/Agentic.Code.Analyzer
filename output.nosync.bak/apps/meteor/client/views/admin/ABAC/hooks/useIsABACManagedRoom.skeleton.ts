## File: apps/meteor/client/views/admin/ABAC/hooks/useIsABACManagedRoom.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isABACManagedRoom } from '@rocket.chat/core-typings';

import { useIsABACAvailable } from './useIsABACAvailable';

export const useIsABACManagedRoom = (room: Partial<IRoom>): boolean => {
    /* Implementation Hidden */
};

```