## File: apps/meteor/client/views/room/contextualBar/Threads/components/ThreadChat.tsx

```typescript
import type { IMessage, IThreadMainMessage } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import { Box, CheckBox, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { clientCallbacks, ContextualbarContent } from '@rocket.chat/ui-client';
import { useMethod, useTranslation, useUserPreference, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useState, useEffect, useCallback, useId } from 'react';

import ThreadMessageList from './ThreadMessageList';
import MessageListErrorBoundary from '../../../MessageList/MessageListErrorBoundary';
import DropTargetOverlay from '../../../body/DropTargetOverlay';
import { useFileUploadDropTarget } from '../../../body/hooks/useFileUploadDropTarget';
import ComposerContainer from '../../../composer/ComposerContainer';
import RoomComposer from '../../../composer/RoomComposer/RoomComposer';
import { useChat } from '../../../contexts/ChatContext';
import { useRoom, useRoomSubscription } from '../../../contexts/RoomContext';
import { DateListProvider } from '../../../providers/DateListProvider';

type ThreadChatProps = {
	mainMessage: IThreadMainMessage;
};

const ThreadChat = ({ mainMessage }: ThreadChatProps) => {
    /* Implementation Hidden */
};

export default ThreadChat;

```