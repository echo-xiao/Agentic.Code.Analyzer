## File: apps/meteor/client/components/message/MessageHeader.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import {
	MessageHeader as FuselageMessageHeader,
	MessageName,
	MessageTimestamp,
	MessageUsername,
	MessageStatusPrivateIndicator,
	MessageNameContainer,
} from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUserPresence, useUserCard } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import StatusIndicators from './StatusIndicators';
import MessageRoles from './header/MessageRoles';
import { useMessageRoles } from './header/hooks/useMessageRoles';
import {
	useMessageListShowUsername,
	useMessageListShowRealName,
	useMessageListShowRoles,
	useMessageListFormatDateAndTime,
	useMessageListFormatTime,
} from './list/MessageListContext';
import { normalizeUsername } from '../../../lib/utils/normalizeUsername';

export type MessageHeaderProps = {
	message: IMessage;
};

const MessageHeader = ({ message }: MessageHeaderProps) => {
    /* Implementation Hidden */
};

export default memo(MessageHeader);

```