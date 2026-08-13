## File: apps/meteor/client/views/root/hooks/loggedIn/useNotificationUserCalendar.ts

```typescript
import type { ICalendarNotification, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { imperativeModal } from '@rocket.chat/ui-client';
import { useStream, useUserPreference } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import OutlookCalendarEventModal from '../../../outlookCalendar/OutlookCalendarEventModal';

export const useNotificationUserCalendar = (user: IUser) => {
    /* Implementation Hidden */
};

```