## File: apps/meteor/client/views/root/hooks/loggedIn/useForceLogout.ts

```typescript
import { useSessionDispatch, useStream, useWipeLocalAuth } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { isSdkTransportEnabled } from '../../../../lib/sdk/sdkTransportEnabled';

const sdkTransportEnabled = isSdkTransportEnabled();

export const useForceLogout = (userId: string) => {
    /* Implementation Hidden */
};

```