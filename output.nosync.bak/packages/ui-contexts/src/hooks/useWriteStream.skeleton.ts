## File: packages/ui-contexts/src/hooks/useWriteStream.ts

```typescript
import type { StreamNames, StreamKeys, StreamerCallbackArgs } from '@rocket.chat/ddp-client';
import { useCallback, useContext } from 'react';

import { ServerContext } from '../ServerContext';

type WriteStreamCallback<N extends StreamNames> = <K extends StreamKeys<N>>(eventName: K, ...args: StreamerCallbackArgs<N, K>) => void;

export function useWriteStream<N extends StreamNames>(streamName: N): WriteStreamCallback<N> {
    /* Implementation Hidden */
}

```