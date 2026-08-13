## File: apps/meteor/client/views/room/MessageList/hooks/useLoadSurroundingMessages.ts

```typescript
import { isThreadMainMessage, isThreadMessage } from '@rocket.chat/core-typings';
import type { IMessage } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useRouteParameter, useSearchParameter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { RoomHistoryManager } from '../../../../../app/ui-utils/client';
import { RoomManager } from '../../../../lib/RoomManager';
import { messagesQueryKeys } from '../../../../lib/queryKeys';
import { mapMessageFromApi } from '../../../../lib/utils/mapMessageFromApi';
import { useGoToRoom } from '../../hooks/useGoToRoom';

export const useLoadSurroundingMessages = () => {
    /* Implementation Hidden */
};

```