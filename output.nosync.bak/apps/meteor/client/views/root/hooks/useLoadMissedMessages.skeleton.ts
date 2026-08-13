## File: apps/meteor/client/views/root/hooks/useLoadMissedMessages.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useConnectionStatus } from '@rocket.chat/ui-contexts';
import { useEffect, useRef } from 'react';

import { LegacyRoomManager, upsertMessage } from '../../../../app/ui-utils/client';
import { callWithErrorHandling } from '../../../lib/utils/callWithErrorHandling';
import { Messages, Subscriptions } from '../../../stores';

/**
 * Loads missed messages for a room
 * @param rid - Room ID
 */
const loadMissedMessages = async (rid: IRoom['_id']): Promise<void> => {
    /* Implementation Hidden */
};

/**
 * React hook that loads missed messages when connection is restored
 */
export const useLoadMissedMessages = (): void => {
    /* Implementation Hidden */
};

```