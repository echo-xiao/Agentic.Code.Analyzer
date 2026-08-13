## File: apps/meteor/client/components/message/variants/ThreadMessagePreview.tsx

```typescript
import type { IThreadMessage } from '@rocket.chat/core-typings';
import {
	Skeleton,
	ThreadMessage,
	ThreadMessageRow,
	ThreadMessageLeftContainer,
	ThreadMessageIconThread,
	ThreadMessageContainer,
	ThreadMessageOrigin,
	ThreadMessageBody,
	ThreadMessageUnfollow,
	CheckBox,
	MessageStatusIndicatorItem,
} from '@rocket.chat/fuselage';
import { MessageTypes } from '@rocket.chat/message-types';
import { MessageAvatar } from '@rocket.chat/ui-avatar';
import type { ComponentProps } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
	useIsSelecting,
	useToggleSelect,
	useIsSelectedMessage,
	useCountSelected,
} from '../../../views/room/MessageList/contexts/SelectedMessagesContext';
import { useMessageBody } from '../../../views/room/MessageList/hooks/useMessageBody';
import { useParentMessage } from '../../../views/room/MessageList/hooks/useParentMessage';
import { isParsedMessage } from '../../../views/room/MessageList/lib/isParsedMessage';
import { useGoToThread } from '../../../views/room/hooks/useGoToThread';
import Emoji from '../../Emoji';
import { useShowTranslated } from '../list/MessageListContext';
import ThreadMessagePreviewBody from './threadPreview/ThreadMessagePreviewBody';
import { getCheckboxLabel } from '../helpers/getCheckboxLabel';

export type ThreadMessagePreviewProps = {
	message: IThreadMessage;
	showUserAvatar: boolean;
	sequential: boolean;
} & ComponentProps<typeof ThreadMessage>;

const ThreadMessagePreview = ({ message, showUserAvatar, sequential, ...props }: ThreadMessagePreviewProps) => {
    /* Implementation Hidden */
};

export default memo(ThreadMessagePreview);

```