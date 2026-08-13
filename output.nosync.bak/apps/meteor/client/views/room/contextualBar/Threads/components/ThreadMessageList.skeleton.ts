## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadMessageList.tsx

```typescript
import type { IMessage, IThreadMainMessage } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import { MessageTypes } from '@rocket.chat/message-types';
import { isTruthy } from '@rocket.chat/tools';
import { clientCallbacks, CustomVirtuaScrollbars } from '@rocket.chat/ui-client';
import { useSearchParameter, useSetting, useUserId, useUserPreference } from '@rocket.chat/ui-contexts';
import { differenceInSeconds } from 'date-fns';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { VirtualizerHandle } from 'virtua';
import { VList } from 'virtua';

import { ThreadMessageItem } from './ThreadMessageItem';
import { useMergedRefsV2 } from '../../../../../hooks/useMergedRefsV2';
import { setMessageJumpQueryStringParameter } from '../../../../../lib/utils/setMessageJumpQueryStringParameter';
import { BubbleDate } from '../../../BubbleDate';
import { useKeepAtBottom } from '../../../MessageList/hooks/useKeepAtBottom';
import { useKeepMountedMessages } from '../../../MessageList/hooks/useKeepMountedMessages';
import { isMessageNewDay } from '../../../MessageList/lib/isMessageNewDay';
import MessageListProvider from '../../../MessageList/providers/MessageListProvider';
import { clearHighlightMessage, setHighlightMessage } from '../../../MessageList/providers/messageHighlightSubscription';
import LoadingMessagesIndicator from '../../../body/LoadingMessagesIndicator';
import { useRoom } from '../../../contexts/RoomContext';
import { useDateScroll } from '../../../hooks/useDateScroll';
import { useFirstUnreadMessageId } from '../../../hooks/useFirstUnreadMessageId';
import { useMessageListNavigation } from '../../../hooks/useMessageListNavigation';
import { useThreadMessagesQuery } from '../hooks/useThreadMessagesQuery';
import './threads.css';

const isMessageSequential = (current: IMessage, previous: IMessage | undefined, groupingRange: number): boolean => {
    /* Implementation Hidden */
};

type ThreadMessageListProps = {
	mainMessage: IThreadMainMessage;
	shouldJumpToBottom: boolean;
	setShouldJumpToBottom: (shouldJumpToBottom: boolean) => void;
};

const ThreadMessageList = ({ mainMessage, shouldJumpToBottom, setShouldJumpToBottom }: ThreadMessageListProps) => {
    /* Implementation Hidden */
};

export default ThreadMessageList;

```