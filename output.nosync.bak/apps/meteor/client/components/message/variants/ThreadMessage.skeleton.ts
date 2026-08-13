## File: apps/meteor/client/components/message/variants/ThreadMessage.tsx

```typescript
import { type IThreadMessage, type IThreadMainMessage, isVideoConfMessage } from '@rocket.chat/core-typings';
import { Message, MessageLeftContainer, MessageContainer } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import { MessageAvatar } from '@rocket.chat/ui-avatar';
import { useTranslation, useUserId, useUserCard } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import type { MessageActionContext } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useIsMessageHighlight } from '../../../views/room/MessageList/contexts/MessageHighlightContext';
import Emoji from '../../Emoji';
import IgnoredContent from '../IgnoredContent';
import MessageHeader from '../MessageHeader';
import MessageToolbarHolder from '../MessageToolbarHolder';
import StatusIndicators from '../StatusIndicators';
import ThreadMessageContent from './thread/ThreadMessageContent';

export type ThreadMessageProps = {
	message: IThreadMessage | IThreadMainMessage;
	unread: boolean;
	sequential: boolean;
	showUserAvatar: boolean;
};

const ThreadMessage = ({ message, sequential, unread, showUserAvatar }: ThreadMessageProps) => {
    /* Implementation Hidden */
};

export default memo(ThreadMessage);

```