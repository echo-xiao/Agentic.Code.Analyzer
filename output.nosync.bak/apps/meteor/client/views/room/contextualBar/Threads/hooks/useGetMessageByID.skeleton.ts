## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useGetMessageByID.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { onClientMessageReceived } from '../../../../../lib/onClientMessageReceived';
import { mapMessageFromApi } from '../../../../../lib/utils/mapMessageFromApi';
import { Messages } from '../../../../../stores';

export const useGetMessageByID = (shouldStoreMessage: boolean = true) => {
    /* Implementation Hidden */
};

```