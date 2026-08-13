## File: apps/meteor/client/views/room/MessageList/MessageList.tsx

```typescript
import type { IMessage, IRoom, IUser } from '@rocket.chat/core-typings';
import { isThreadMessage } from '@rocket.chat/core-typings';
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { MessageTypes } from '@rocket.chat/message-types';
import { useSearchParameter, useSetting, useUserPreference } from '@rocket.chat/ui-contexts';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { VirtualizerHandle } from 'virtua';
import { VList } from 'virtua';

import { MessageListItem } from './MessageListItem';
import { useRoomSubscription } from '../contexts/RoomContext';
import { useFirstUnreadMessageId } from '../hooks/useFirstUnreadMessageId';
import { SelectedMessagesProvider } from '../providers/SelectedMessagesProvider';
import { useMessages } from './hooks/useMessages';
import useTryToJumpToMessage from './hooks/useTryToJumpToMessage';
import { isMessageSequential } from './lib/isMessageSequential';
import MessageListProvider from './providers/MessageListProvider';
import { RoomManager } from '../../../lib/RoomManager';
import LoadingMessagesIndicator from '../body/LoadingMessagesIndicator';
import RetentionPolicyWarning from '../body/RetentionPolicyWarning';
import RoomForeword from '../body/RoomForeword/RoomForeword';
import { useStoreScrollPosition } from '../body/hooks/useStoreScrollPosition';
import { useChat } from '../contexts/ChatContext';
import type { RetentionPolicy } from '../hooks/useRetentionPolicy';
import { useKeepMountedMessages } from './hooks/useKeepMountedMessages';

export type MessageListProps = {
	rid: IRoom['_id'];
	canPreview: boolean;
	hasMorePreviousMessages: boolean;
	isLoadingMoreMessages: boolean;
	user: IUser | null;
	room: IRoom;
	retentionPolicy: RetentionPolicy | undefined;
	hasMoreNextMessages: boolean;
	shouldJumpToBottom: boolean;
	isAtBottom: MutableRefObject<boolean>;
	isJumpingToMessage: boolean;
	setIsJumpingToMessage: Dispatch<SetStateAction<boolean>>;
	setUnreadCount: Dispatch<SetStateAction<number>>;
	setLastMessageDate: Dispatch<SetStateAction<Date | undefined>>;
	debouncedClearNewMessagesOnScroll: () => void;
	handleDateScroll: (topMessage: IMessage | undefined, offset: number) => void;
	setShouldJumpToBottom: Dispatch<SetStateAction<boolean>>;
	debouncedMessageRead: () => void;
	setKeepAtBottom: (keepAtBottom: () => void) => void;
};

export const MessageList = function MessageList({
	rid,
	canPreview,
	hasMorePreviousMessages,
	isLoadingMoreMessages,
	user,
	room,
	retentionPolicy,
	hasMoreNextMessages,
	shouldJumpToBottom,
	setShouldJumpToBottom,
	isAtBottom,
	isJumpingToMessage,
	setIsJumpingToMessage,
	setUnreadCount,
	setLastMessageDate,
	debouncedClearNewMessagesOnScroll,
	handleDateScroll,
	debouncedMessageRead,
	setKeepAtBottom,
}: MessageListProps) {
    /* Implementation Hidden */
};

```