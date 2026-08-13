## File: apps/meteor/client/views/omnichannel/contactHistory/MessageList/ContactHistoryMessage.tsx

```typescript
import { isQuoteAttachment, type IMessage, type MessageAttachment } from '@rocket.chat/core-typings';
import {
	Message as MessageTemplate,
	MessageLeftContainer,
	MessageContainer,
	MessageBody,
	MessageDivider,
	MessageName,
	MessageUsername,
	MessageTimestamp,
	MessageHeader as MessageHeaderTemplate,
	MessageSystem,
	MessageSystemLeftContainer,
	MessageSystemContainer,
	MessageSystemBlock,
	MessageSystemName,
	MessageSystemBody,
	MessageSystemTimestamp,
	Bubble,
} from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUserCard } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import MessageContentBody from '../../../../components/message/MessageContentBody';
import StatusIndicators from '../../../../components/message/StatusIndicators';
import Attachments from '../../../../components/message/content/Attachments';
import UiKitMessageBlock from '../../../../components/message/uikit/UiKitMessageBlock';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import { useFormatTime } from '../../../../hooks/useFormatTime';

type ContactHistoryMessageProps = {
	message: IMessage;
	sequential: boolean;
	isNewDay: boolean;
	showUserAvatar: boolean;
};

const ContactHistoryMessage = ({ message, sequential, isNewDay, showUserAvatar }: ContactHistoryMessageProps) => {
    /* Implementation Hidden */
};

export default memo(ContactHistoryMessage);

```