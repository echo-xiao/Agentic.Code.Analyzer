## File: apps/meteor/client/views/room/MessageList/providers/MessageHighlightProvider.tsx

```typescript
import type { ContextType, ReactNode } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import * as messageHighlightSubscription from './messageHighlightSubscription';
import MessageHighlightContext from '../contexts/MessageHighlightContext';

export type MessageHighlightProviderProps = { children: ReactNode };

const MessageHighlightProvider = ({ children }: MessageHighlightProviderProps) => {
    /* Implementation Hidden */
};

export default MessageHighlightProvider;

```