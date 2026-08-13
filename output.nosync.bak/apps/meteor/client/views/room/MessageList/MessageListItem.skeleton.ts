## File: apps/meteor/client/views/room/MessageList/MessageListItem.tsx

```typescript
import { isThreadMessage, type IMessage, type ISubscription } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Bubble, MessageDivider } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { isMessageNewDay } from './lib/isMessageNewDay';
import { useMessageListFormatDate } from '../../../components/message/list/MessageListContext';
import RoomMessage from '../../../components/message/variants/RoomMessage';
import SystemMessage from '../../../components/message/variants/SystemMessage';
import ThreadMessagePreview from '../../../components/message/variants/ThreadMessagePreview';
import { useDateRef } from '../providers/DateListProvider';

export type MessageListItemProps = {
	message: IMessage;
	previous?: IMessage;
	showUnreadDivider: boolean;

	sequential: boolean;
	showUserAvatar: boolean;
	visible: boolean;
	subscription: ISubscription | undefined;
	system: boolean;
};
export const MessageListItem = ({
	message,
	previous,
	showUnreadDivider,
	sequential,
	showUserAvatar,
	visible,
	subscription,
	system,
}: MessageListItemProps) => {
    /* Implementation Hidden */
};

```