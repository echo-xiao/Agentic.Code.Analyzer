## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useThreadMessagesQuery.ts

```typescript
import { isThreadMessage, type IMessage, type IRoom, type IThreadMainMessage, type IThreadMessage } from '@rocket.chat/core-typings';
import { useMethod, useStream } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { onClientMessageReceived } from '../../../../../lib/onClientMessageReceived';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { modifyMessageOnFilesDelete } from '../../../../../lib/utils/modifyMessageOnFilesDelete';
import {
	createDeleteCriteria,
	markThreadMessagesAsRead,
	mergeThreadMessages,
	upsertThreadMessageInCache,
} from '../../../../../lib/utils/threadMessageUtils';
import { useRoom } from '../../../contexts/RoomContext';

const processMessages = async (messages: IMessage[]): Promise<IMessage[]> => {
    /* Implementation Hidden */
};

export const useThreadMessagesQuery = (tmid: IThreadMainMessage['_id'], rid?: IRoom['_id']) => {
    /* Implementation Hidden */
};

```