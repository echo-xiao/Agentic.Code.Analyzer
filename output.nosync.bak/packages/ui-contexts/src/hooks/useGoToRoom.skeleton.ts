## File: packages/ui-contexts/src/hooks/useGoToRoom.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';

import { useEndpoint } from './useEndpoint';
import { useRouter } from './useRouter';

export const useGoToRoom = (): ((roomId: IRoom['_id']) => Promise<void>) => {
    /* Implementation Hidden */
};

```