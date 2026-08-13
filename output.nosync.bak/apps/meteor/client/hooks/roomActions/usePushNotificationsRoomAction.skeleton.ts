## File: apps/meteor/client/hooks/roomActions/usePushNotificationsRoomAction.ts

```typescript
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

import { useRoomSubscription } from '../../views/room/contexts/RoomContext';

const NotificationPreferences = lazy(() => import('../../views/room/contextualBar/NotificationPreferences'));

export const usePushNotificationsRoomAction = () => {
    /* Implementation Hidden */
};

```