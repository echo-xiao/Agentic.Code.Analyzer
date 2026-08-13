## File: apps/meteor/client/views/root/hooks/loggedIn/useLogoutCleanup.ts

```typescript
import { useOnLogout, useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { useFireGlobalEvent } from '../../../../hooks/useFireGlobalEvent';
import { closeAllRooms } from '../closeAllRooms';
import { purgeAllDrafts } from '../purgeAllDrafts';

export const useLogoutCleanup = () => {
    /* Implementation Hidden */
};

```