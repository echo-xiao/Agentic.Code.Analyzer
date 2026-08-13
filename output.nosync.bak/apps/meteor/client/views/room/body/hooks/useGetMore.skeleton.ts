## File: apps/meteor/client/views/room/body/hooks/useGetMore.ts

```typescript
import { useSafeRefCallback } from '@rocket.chat/fuselage-hooks';
import { useSearchParameter } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { flushSync } from 'react-dom';

import { getBoundingClientRect } from '../../../../../app/ui/client/views/app/lib/scrolling';
import { RoomHistoryManager } from '../../../../../app/ui-utils/client';
import { withThrottling } from '../../../../../lib/utils/highOrderFunctions';

export const useGetMore = (rid: string, isJumpingToMessage: boolean) => {
    /* Implementation Hidden */
};

```