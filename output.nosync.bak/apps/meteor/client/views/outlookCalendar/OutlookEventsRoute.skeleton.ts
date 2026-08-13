## File: apps/meteor/client/views/outlookCalendar/OutlookEventsRoute.tsx

```typescript
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useState } from 'react';

import OutlookEventsList from './OutlookEventsList';
import OutlookSettingsList from './OutlookSettingsList';

type OutlookCalendarRoutes = 'list' | 'settings';

const CALENDAR_ROUTES: { [key: string]: OutlookCalendarRoutes } = {
	LIST: 'list',
	SETTINGS: 'settings',
};

const OutlookEventsRoute = () => {
    /* Implementation Hidden */
};

export default OutlookEventsRoute;

```