## File: apps/meteor/client/views/room/contextualBar/MessageListTab.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Box, MessageDivider, Throbber } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { MessageTypes } from '@rocket.chat/message-types';
import {
	VirtualizedScrollbars,
	ContextualbarContent,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarEmptyContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useUserPreference, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';
import RoomMessage from '../../../components/message/variants/RoomMessage';
import SystemMessage from '../../../components/message/variants/SystemMessage';
import { useFormatDate } from '../../../hooks/useFormatDate';
import MessageListErrorBoundary from '../MessageList/MessageListErrorBoundary';
import { isMessageNewDay } from '../MessageList/lib/isMessageNewDay';
import MessageListProvider from '../MessageList/providers/MessageListProvider';
import { useRoomSubscription } from '../contexts/RoomContext';

type MessageListTabProps = {
	iconName: IconName;
	title: ReactNode;
	emptyResultMessage: string;
	context: MessageActionContext;
	queryResult: UseQueryResult<IMessage[]>;
};

const MessageListTab = ({ iconName, title, emptyResultMessage, context, queryResult }: MessageListTabProps) => {
    /* Implementation Hidden */
};

export default MessageListTab;

```