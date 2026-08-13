## File: apps/meteor/client/views/room/body/RoomBody.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { isTruthy } from '@rocket.chat/tools';
import { CustomVirtuaScrollbars, useEmbeddedLayout } from '@rocket.chat/ui-client';
import { usePermission, useRole, useSetting, useTranslation, useUser, useUserPreference, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { useMergedRefsV2 } from '../../../hooks/useMergedRefsV2';
import { BubbleDate } from '../BubbleDate';
import { MessageList } from '../MessageList';
import DropTargetOverlay from './DropTargetOverlay';
import JumpToRecentMessageButton from './JumpToRecentMessageButton';
import UnreadMessagesIndicator from './UnreadMessagesIndicator';
import MessageListErrorBoundary from '../MessageList/MessageListErrorBoundary';
import RoomAnnouncement from '../RoomAnnouncement';
import UploadProgressIndicator from './UploadProgress';
import ComposerContainer from '../composer/ComposerContainer';
import { useFileUpload } from './hooks/useFileUpload';
import { useGoToHomeOnRemoved } from './hooks/useGoToHomeOnRemoved';
import { useQuoteMessageByUrl } from './hooks/useQuoteMessageByUrl';
import { useReadMessageWindowEvents } from './hooks/useReadMessageWindowEvents';
import RoomComposer from '../composer/RoomComposer/RoomComposer';
import { useChat } from '../contexts/ChatContext';
import { useRoom, useRoomSubscription, useRoomMessages } from '../contexts/RoomContext';
import { useDateScroll } from '../hooks/useDateScroll';
import { useMessageListNavigation } from '../hooks/useMessageListNavigation';
import { useRetentionPolicy } from '../hooks/useRetentionPolicy';
import { useFileUploadDropTarget } from './hooks/useFileUploadDropTarget';
import { useGetMore } from './hooks/useGetMore';
import { useHasNewMessages } from './hooks/useHasNewMessages';
import { useSelectAllAndScrollToTop } from './hooks/useSelectAllAndScrollToTop';
import { useHandleUnread } from './hooks/useUnreadMessages';
import { useKeepAtBottom } from '../MessageList/hooks/useKeepAtBottom';
import useTryToJumpToThreadMessage from '../MessageList/hooks/useTryToJumpToThreadMessage';

const RoomBody = () => {
    /* Implementation Hidden */
};

export default memo(RoomBody);

```