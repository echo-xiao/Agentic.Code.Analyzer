## File: apps/meteor/client/views/room/MessageList/hooks/useTryToJumpToThreadMessage.ts

```typescript
import { isThreadMainMessage, isThreadMessage } from '@rocket.chat/core-typings';
import { useEndpoint, useRouteParameter, useSearchParameter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { RoomManager } from '../../../../lib/RoomManager';
import { messagesQueryKeys } from '../../../../lib/queryKeys';
import { mapMessageFromApi } from '../../../../lib/utils/mapMessageFromApi';
import { useGoToRoom } from '../../hooks/useGoToRoom';

const useTryToJumpToThreadMessage = (): void => {
    /* Implementation Hidden */
};

export default useTryToJumpToThreadMessage;

```