## File: apps/meteor/client/views/admin/moderation/helpers/ContextMessage.tsx

```typescript
import type { IMessage, MessageReport, MessageAttachment } from '@rocket.chat/core-typings';
import { isE2EEMessage, isQuoteAttachment } from '@rocket.chat/core-typings';
import {
	Message,
	MessageDivider,
	MessageLeftContainer,
	MessageContainer,
	MessageHeader,
	MessageTimestamp,
	MessageRole,
	MessageBody,
	MessageName,
	MessageToolbar,
	MessageToolbarItem,
	MessageToolbarWrapper,
	MessageUsername,
} from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ReportReasonCollapsible from './ReportReasonCollapsible';
import MessageContentBody from '../../../../components/message/MessageContentBody';
import Attachments from '../../../../components/message/content/Attachments';
import UiKitMessageBlock from '../../../../components/message/uikit/UiKitMessageBlock';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import { useFormatTime } from '../../../../hooks/useFormatTime';
import MessageReportInfo from '../MessageReportInfo';
import useDeleteMessage from '../hooks/useDeleteMessage';
import { useDismissMessageAction } from '../hooks/useDismissMessageAction';

const ContextMessage = ({
	message,
	room,
	deleted,
	onRedirect,
	onChange,
}: {
	message: any;
	room: MessageReport['room'];
	deleted: boolean;
	onRedirect: (id: IMessage['_id']) => void;
	onChange: () => void;
}) => {
    /* Implementation Hidden */
};

export default ContextMessage;

```