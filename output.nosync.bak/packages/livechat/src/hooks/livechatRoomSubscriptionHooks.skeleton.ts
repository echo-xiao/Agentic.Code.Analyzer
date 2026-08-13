## File: packages/livechat/src/hooks/livechatRoomSubscriptionHooks.ts

```typescript
import { useStream } from '@rocket.chat/ui-contexts';
import { useEffect } from 'preact/hooks';

import { onAgentChange, onAgentStatusChange, onQueuePositionChange } from '../lib/room';

export const useAgentChangeSubscription = (rid: string) => {
    /* Implementation Hidden */
};

export const useAgentStatusChangeSubscription = (rid: string) => {
    /* Implementation Hidden */
};

export const useQueuePositionChangeSubscription = (rid: string) => {
    /* Implementation Hidden */
};

```