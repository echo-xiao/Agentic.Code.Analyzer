## File: apps/meteor/client/hooks/roomActions/useBannedUsersRoomAction.ts

```typescript
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { usePermission } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

import { useRoom } from '../../views/room/contexts/RoomContext';

const BannedUsers = lazy(() => import('../../views/room/contextualBar/BannedUsers'));

export const useBannedUsersRoomAction = () => {
    /* Implementation Hidden */
};

```