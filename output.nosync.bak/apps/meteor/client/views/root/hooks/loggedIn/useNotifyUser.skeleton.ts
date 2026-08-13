## File: apps/meteor/client/views/root/hooks/loggedIn/useNotifyUser.ts

```typescript
import type { AtLeast, INotificationDesktop, ISubscription, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEmbeddedLayout } from '@rocket.chat/ui-client';
import { useCustomSound, useRouter, useStream, useUserPreference } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { useDesktopNotification } from '../../../../hooks/notification/useDesktopNotification';
import { useNewMessageNotification } from '../../../../hooks/notification/useNewMessageNotification';
import { RoomManager } from '../../../../lib/RoomManager';
import { fireGlobalEvent } from '../../../../lib/utils/fireGlobalEvent';

export const useNotifyUser = (user: IUser) => {
    /* Implementation Hidden */
};

```