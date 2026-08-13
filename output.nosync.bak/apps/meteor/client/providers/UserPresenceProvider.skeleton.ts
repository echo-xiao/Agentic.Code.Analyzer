## File: apps/meteor/client/providers/UserPresenceProvider.tsx

```typescript
import type { UserPresenceContextValue } from '@rocket.chat/ui-contexts';
import { useSetting, UserPresenceContext } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo, useEffect } from 'react';

import { useUserPresenceListener } from '../hooks/useUserPresenceListener';
import { Presence } from '../lib/presence';
import { UserPresence } from '../lib/userPresence';

export const userPresence = new UserPresence();

export type UserPresenceProviderProps = {
	children?: ReactNode;
};

const UserPresenceProvider = ({ children }: UserPresenceProviderProps) => {
    /* Implementation Hidden */
};

export default UserPresenceProvider;

```