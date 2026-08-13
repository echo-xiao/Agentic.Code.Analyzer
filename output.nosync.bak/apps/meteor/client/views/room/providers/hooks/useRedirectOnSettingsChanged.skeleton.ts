## File: apps/meteor/client/views/room/providers/hooks/useRedirectOnSettingsChanged.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { LegacyRoomManager } from '../../../../../app/ui-utils/client';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';

const routeNameToRoomTypeMap: Record<string, string> = {
	channel: 'c',
	group: 'p',
	direct: 'd',
	live: 'l',
};

export const useRedirectOnSettingsChanged = (subscription?: ISubscription | null) => {
    /* Implementation Hidden */
};

```