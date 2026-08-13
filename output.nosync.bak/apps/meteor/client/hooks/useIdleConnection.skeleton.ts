## File: apps/meteor/client/hooks/useIdleConnection.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useConnectionStatus, useSetting } from '@rocket.chat/ui-contexts';

import { useIdleActiveEvents } from './useIdleActiveEvents';

export const useIdleConnection = (uid: IUser['_id'] | undefined) => {
    /* Implementation Hidden */
};

```