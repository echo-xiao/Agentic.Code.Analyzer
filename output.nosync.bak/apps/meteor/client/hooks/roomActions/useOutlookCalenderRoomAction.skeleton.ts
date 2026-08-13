## File: apps/meteor/client/hooks/roomActions/useOutlookCalenderRoomAction.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

const OutlookEventsRoute = lazy(() => import('../../views/outlookCalendar/OutlookEventsRoute'));

export const useOutlookCalenderRoomAction = () => {
    /* Implementation Hidden */
};

```