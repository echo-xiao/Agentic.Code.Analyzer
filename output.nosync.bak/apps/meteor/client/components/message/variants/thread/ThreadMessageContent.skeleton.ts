## File: apps/meteor/client/components/message/variants/thread/ThreadMessageContent.tsx

```typescript
import type { IThreadMainMessage, IThreadMessage } from '@rocket.chat/core-typings';
import { isE2EEMessage, isQuoteAttachment } from '@rocket.chat/core-typings';
import { MessageBody } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useUserId, useUserPresence } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import MessageContentBody from '../../MessageContentBody';
import ReadReceiptIndicator from '../../ReadReceiptIndicator';
import Attachments from '../../content/Attachments';
import BroadcastMetrics from '../../content/BroadcastMetrics';
import Location from '../../content/Location';
import MessageActions from '../../content/MessageActions';
import Reactions from '../../content/Reactions';
import UrlPreviews from '../../content/UrlPreviews';
import { useNormalizedMessage } from '../../hooks/useNormalizedMessage';
import { useOembedLayout } from '../../hooks/useOembedLayout';
import { useSubscriptionFromMessageQuery } from '../../hooks/useSubscriptionFromMessageQuery';
import { useMessageListReadReceipts } from '../../list/MessageListContext';
import UiKitMessageBlock from '../../uikit/UiKitMessageBlock';

export type ThreadMessageContentProps = {
	message: IThreadMessage | IThreadMainMessage;
};

const ThreadMessageContent = ({ message }: ThreadMessageContentProps) => {
    /* Implementation Hidden */
};

export default memo(ThreadMessageContent);

```