## File: packages/livechat/src/hooks/useRoomMessagesSubscription.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useStream } from '@rocket.chat/ui-contexts';
import { useEffect } from 'preact/hooks';

import { onMessage } from '../lib/room';

export const useRoomMessagesSubscription = (rid: string, token: string) => {
    /* Implementation Hidden */
};

```