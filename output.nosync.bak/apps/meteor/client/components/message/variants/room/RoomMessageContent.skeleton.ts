## File: apps/meteor/client/components/message/variants/room/RoomMessageContent.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isDiscussionMessage, isThreadMainMessage, isE2EEMessage, isQuoteAttachment } from '@rocket.chat/core-typings';
import { MessageBody } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useUserId, useUserPresence } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useChat } from '../../../../views/room/contexts/ChatContext';
import MessageContentBody from '../../MessageContentBody';
import ReadReceiptIndicator from '../../ReadReceiptIndicator';
import Attachments from '../../content/Attachments';
import BroadcastMetrics from '../../content/BroadcastMetrics';
import DiscussionMetrics from '../../content/DiscussionMetrics';
import Location from '../../content/Location';
import MessageActions from '../../content/MessageActions';
import Reactions from '../../content/Reactions';
import ThreadMetrics from '../../content/ThreadMetrics';
import UrlPreviews from '../../content/UrlPreviews';
import { useNormalizedMessage } from '../../hooks/useNormalizedMessage';
import { useOembedLayout } from '../../hooks/useOembedLayout';
import { useSubscriptionFromMessageQuery } from '../../hooks/useSubscriptionFromMessageQuery';
import { useMessageListReadReceipts } from '../../list/MessageListContext';
import UiKitMessageBlock from '../../uikit/UiKitMessageBlock';

export type RoomMessageContentProps = {
	message: IMessage;
	unread: boolean;
	mention: boolean;
	all: boolean;
	searchText?: string;
};

const RoomMessageContent = ({ message, unread, all, mention, searchText }: RoomMessageContentProps) => {
    /* Implementation Hidden */
};

export default memo(RoomMessageContent);

```