## File: apps/meteor/client/components/message/variants/SystemMessage.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import {
	MessageSystem,
	MessageSystemBody,
	MessageSystemContainer,
	MessageSystemLeftContainer,
	MessageSystemName,
	MessageSystemTimestamp,
	MessageSystemBlock,
	CheckBox,
	MessageUsername,
	MessageNameContainer,
} from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { MessageTypes } from '@rocket.chat/message-types';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useUserPresence, useUserCard } from '@rocket.chat/ui-contexts';
import type { ComponentProps, KeyboardEvent } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { normalizeUsername } from '../../../../lib/utils/normalizeUsername';
import {
	useIsSelecting,
	useToggleSelect,
	useIsSelectedMessage,
	useCountSelected,
} from '../../../views/room/MessageList/contexts/SelectedMessagesContext';
import Attachments from '../content/Attachments';
import MessageActions from '../content/MessageActions';
import { getCheckboxLabel } from '../helpers/getCheckboxLabel';
import {
	useMessageListShowRealName,
	useMessageListShowUsername,
	useMessageListFormatDateAndTime,
	useMessageListFormatTime,
} from '../list/MessageListContext';

export type SystemMessageProps = {
	message: IMessage;
	showUserAvatar: boolean;
} & ComponentProps<typeof MessageSystem>;

const SystemMessage = ({ message, showUserAvatar, ...props }: SystemMessageProps) => {
    /* Implementation Hidden */
};

export default memo(SystemMessage);

```