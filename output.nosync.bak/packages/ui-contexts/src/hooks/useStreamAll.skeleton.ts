## File: packages/ui-contexts/src/hooks/useStreamAll.ts

```typescript
import type { StreamNames, StreamerEvents } from '@rocket.chat/ddp-client';
import { useContext, useMemo } from 'react';

import { ServerContext } from '../ServerContext';

export type StreamAllSubscriber<N extends StreamNames> = (
	callback: (eventName: string, args: StreamerEvents[N][number]['args']) => void,
) => () => void;

export function useStreamAll<N extends StreamNames>(streamName: N): StreamAllSubscriber<N> {
    /* Implementation Hidden */
}

```