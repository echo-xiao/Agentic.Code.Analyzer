## File: apps/meteor/client/components/message/variants/RoomMessage.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Message, MessageLeftContainer, MessageContainer, CheckBox } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import { MessageAvatar } from '@rocket.chat/ui-avatar';
import { useUserId, useUserCard } from '@rocket.chat/ui-contexts';
import type { ComponentProps, KeyboardEvent } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useIsMessageHighlight } from '../../../views/room/MessageList/contexts/MessageHighlightContext';
import {
	useIsSelecting,
	useToggleSelect,
	useIsSelectedMessage,
	useCountSelected,
} from '../../../views/room/MessageList/contexts/SelectedMessagesContext';
import Emoji from '../../Emoji';
import IgnoredContent from '../IgnoredContent';
import MessageHeader from '../MessageHeader';
import MessageToolbarHolder from '../MessageToolbarHolder';
import StatusIndicators from '../StatusIndicators';
import RoomMessageContent from './room/RoomMessageContent';
import { getCheckboxLabel } from '../helpers/getCheckboxLabel';
import { useMessageListReadReceipts } from '../list/MessageListContext';

export type RoomMessageProps = {
	message: IMessage & { ignored?: boolean };
	showUserAvatar: boolean;
	sequential: boolean;
	unread: boolean;
	mention: boolean;
	all: boolean;
	context?: MessageActionContext;
	ignoredUser?: boolean;
	searchText?: string;
} & ComponentProps<typeof Message>;

const getAriaLabelledBy = ({
	readReceiptEnabled,
	messageId,
	sequential,
}: {
	readReceiptEnabled: boolean;
	messageId: string;
	sequential: boolean;
}) => {
    /* Implementation Hidden */
};

const RoomMessage = ({
	message,
	showUserAvatar,
	sequential,
	all,
	mention,
	unread,
	context,
	ignoredUser,
	searchText,
	...props
}: RoomMessageProps) => {
    /* Implementation Hidden */
};

export default memo(RoomMessage);

```