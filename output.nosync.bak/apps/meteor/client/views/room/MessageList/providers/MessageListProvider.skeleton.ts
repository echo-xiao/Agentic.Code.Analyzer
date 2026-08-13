## File: apps/meteor/client/views/room/MessageList/providers/MessageListProvider.tsx

```typescript
import { isThreadMainMessage, isRoomFederated } from '@rocket.chat/core-typings';
import { useLayout, useUser, useUserPreference, useSetting, useEndpoint, useSearchParameter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo, memo } from 'react';

import { getRegexHighlight, getRegexHighlightUrl } from '../../../../../app/highlight-words/client/helper';
import type { MessageListContextValue } from '../../../../components/message/list/MessageListContext';
import { MessageListContext } from '../../../../components/message/list/MessageListContext';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import { useFormatTime } from '../../../../hooks/useFormatTime';
import AttachmentProvider from '../../../../providers/AttachmentProvider';
import { useChat } from '../../contexts/ChatContext';
import { useRoom, useRoomSubscription } from '../../contexts/RoomContext';
import { useAutoTranslate } from '../hooks/useAutoTranslate';
import { useKatex } from '../hooks/useKatex';

export type MessageListProviderProps = {
	children: ReactNode;
	attachmentDimension?: {
		width?: number;
		height?: number;
	};
};

const MessageListProvider = ({ children, attachmentDimension }: MessageListProviderProps) => {
    /* Implementation Hidden */
};

export default memo(MessageListProvider);

```