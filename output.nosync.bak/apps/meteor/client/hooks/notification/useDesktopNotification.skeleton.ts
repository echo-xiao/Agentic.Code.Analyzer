## File: apps/meteor/client/hooks/notification/useDesktopNotification.ts

```typescript
import type { INotificationDesktop } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useUser } from '@rocket.chat/ui-contexts';

import { useNotification } from './useNotification';
import { RoomManager } from '../../lib/RoomManager';
import { e2e } from '../../lib/e2ee';
import { getAvatarAsPng } from '../../lib/utils/getAvatarAsPng';

export const useDesktopNotification = () => {
    /* Implementation Hidden */
};

```