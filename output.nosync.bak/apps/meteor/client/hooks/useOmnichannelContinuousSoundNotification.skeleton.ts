## File: apps/meteor/client/hooks/useOmnichannelContinuousSoundNotification.ts

```typescript
import { useCustomSound, useSetting, useUserSubscriptions } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

const query = { t: 'l', ls: { $exists: false }, open: true };
export const useOmnichannelContinuousSoundNotification = <T>(queue: T[]) => {
    /* Implementation Hidden */
};

```