## File: apps/meteor/client/views/room/body/hooks/useStoreScrollPosition.ts

```typescript
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import type { MutableRefObject } from 'react';
import type { VirtualizerHandle } from 'virtua';

import { RoomManager } from '../../../../lib/RoomManager';

type UseStoreScrollPositionProps = {
	rid: string;
	isAtBottom: MutableRefObject<boolean>;
	virtualizerRef: MutableRefObject<VirtualizerHandle | null>;
};

export function useStoreScrollPosition({ rid, isAtBottom, virtualizerRef }: UseStoreScrollPositionProps) {
    /* Implementation Hidden */
}

```