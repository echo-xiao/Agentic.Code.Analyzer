## File: apps/meteor/client/providers/UserProvider/hooks/useReloadAfterLogin.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useEffect, useRef } from 'react';

import { LegacyRoomManager } from '../../../../app/ui-utils/client';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

export const useReloadAfterLogin = (user: IUser | null) => {
    /* Implementation Hidden */
};

```