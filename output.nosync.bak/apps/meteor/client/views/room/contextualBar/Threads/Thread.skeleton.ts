## File: apps/meteor/client/views/room/contextualBar/Threads/Thread.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, ModalBackdrop, Skeleton } from '@rocket.chat/fuselage';
import { useLocalStorage } from '@rocket.chat/fuselage-hooks';
import {
	Contextualbar,
	ContextualbarHeader,
	ContextualbarAction,
	ContextualbarActions,
	ContextualbarClose,
	ContextualbarBack,
	ContextualbarInnerContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import {
	useLayoutContextualBarExpanded,
	useToastMessageDispatch,
	useTranslation,
	useUserId,
	useRoomToolbox,
} from '@rocket.chat/ui-contexts';
import { createPortal } from 'react-dom';

import ThreadChat from './components/ThreadChat';
import ThreadSkeleton from './components/ThreadSkeleton';
import ThreadTitle from './components/ThreadTitle';
import { useThreadMainMessageQuery } from './hooks/useThreadMainMessageQuery';
import { useToggleFollowingThreadMutation } from './hooks/useToggleFollowingThreadMutation';
import { useGoToThreadList } from '../../hooks/useGoToThreadList';
import ChatProvider from '../../providers/ChatProvider';

type ThreadProps = {
	tmid: IMessage['_id'];
};

const Thread = ({ tmid }: ThreadProps) => {
    /* Implementation Hidden */
};

export default Thread;

```