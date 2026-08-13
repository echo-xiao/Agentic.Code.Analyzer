## File: packages/ui-voip/src/hooks/useIceServers.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import type { IceServer } from '../definitions';
import { parseStringToIceServers } from '../utils/parseStringToIceServers';

export const useIceServers = (): IceServer[] => {
    /* Implementation Hidden */
};

```