## File: apps/meteor/client/providers/UserProvider/hooks/useClearRemovedRoomsHistory.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useStream } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { RoomHistoryManager } from '../../../../app/ui-utils/client';

export const useClearRemovedRoomsHistory = (userId: IUser['_id'] | undefined) => {
    /* Implementation Hidden */
};

```