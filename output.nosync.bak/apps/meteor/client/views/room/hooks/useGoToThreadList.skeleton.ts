## File: apps/meteor/client/views/room/hooks/useGoToThreadList.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRouter } from '@rocket.chat/ui-contexts';

import { useRoom } from '../contexts/RoomContext';

export const useGoToThreadList = ({ replace = false }: { replace?: boolean } = {}): (() => void) => {
    /* Implementation Hidden */
};

```