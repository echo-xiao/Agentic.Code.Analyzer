## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useThreadMainMessageQuery.ts

```typescript
import type { IMessage, IThreadMainMessage, MessageAttachment } from '@rocket.chat/core-typings';
import { useStream } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { useGetMessageByID } from './useGetMessageByID';
import { withDebouncing } from '../../../../../../lib/utils/highOrderFunctions';
import { onClientMessageReceived } from '../../../../../lib/onClientMessageReceived';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { modifyMessageOnFilesDelete } from '../../../../../lib/utils/modifyMessageOnFilesDelete';
import { createDeleteCriteria } from '../../../../../lib/utils/threadMessageUtils';
import { useRoom } from '../../../contexts/RoomContext';

type RoomMessagesRidEvent = IMessage;

const useSubscribeToMessage = () => {
    /* Implementation Hidden */
};

export const useThreadMainMessageQuery = (
	tmid: IMessage['_id'],
	{ onDelete }: { onDelete?: () => void } = {},
): UseQueryResult<IThreadMainMessage, Error> => {
    /* Implementation Hidden */
};

```