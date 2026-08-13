## File: apps/meteor/client/views/root/hooks/loggedIn/useUnread.ts

```typescript
import { manageFavicon } from '@rocket.chat/favicon';
import { useSession, useSessionDispatch, useUserPreference, useUserSubscriptions } from '@rocket.chat/ui-contexts';
import { useEffect, useRef } from 'react';

import { useFireGlobalEvent } from '../../../../hooks/useFireGlobalEvent';

const query = { open: { $ne: false }, hideUnreadStatus: { $ne: true }, archived: { $ne: true } };
const options = { fields: { unread: 1, alert: 1, rid: 1, t: 1, name: 1, ls: 1, unreadAlert: 1, fname: 1, prid: 1 } };
const updateFavicon = manageFavicon();

type UnreadData = { unread: number; alert: boolean | undefined; unreadAlert: string | undefined };

export const useUnread = () => {
    /* Implementation Hidden */
};

```