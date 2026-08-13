## File: apps/meteor/client/views/room/contextualBar/RoomFiles/hooks/useMessageDeletionIsAllowed.ts

```typescript
import type { IRoom, IUser, IUpload } from '@rocket.chat/core-typings';
import { useSetting, usePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { getDifference, MINUTES } from '../lib/getDifference';

export const useMessageDeletionIsAllowed = (rid: IRoom['_id'], file: IUpload, uid: IUser['_id'] | undefined) => {
    /* Implementation Hidden */
};

```