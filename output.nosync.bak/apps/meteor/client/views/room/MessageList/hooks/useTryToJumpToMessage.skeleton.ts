## File: apps/meteor/client/views/room/MessageList/hooks/useTryToJumpToMessage.ts

```typescript
import { isThreadMainMessage, isThreadMessage } from '@rocket.chat/core-typings';
import { useEndpoint, useSearchParameter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useEffect } from 'react';
import type { WindowVirtualizerHandle } from 'virtua';

import { RoomHistoryManager } from '../../../../../app/ui-utils/client';
import { messagesQueryKeys } from '../../../../lib/queryKeys';
import { mapMessageFromApi } from '../../../../lib/utils/mapMessageFromApi';
import { setMessageJumpQueryStringParameter } from '../../../../lib/utils/setMessageJumpQueryStringParameter';
import { useRoomMessages } from '../../contexts/RoomContext';
import { clearHighlightMessage, setHighlightMessage } from '../providers/messageHighlightSubscription';

type UseTryToJumpToMessageProps = {
	rid: string;
	virtualizerRef: MutableRefObject<WindowVirtualizerHandle | null>;
	setIsJumpingToMessage: Dispatch<SetStateAction<boolean>>;
	messages: { _id: string }[];
};

const useTryToJumpToMessage = ({ rid, virtualizerRef, setIsJumpingToMessage, messages }: UseTryToJumpToMessageProps) => {
    /* Implementation Hidden */
};

export default useTryToJumpToMessage;

```