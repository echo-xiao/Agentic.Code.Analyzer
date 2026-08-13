## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoHistory/ContactInfoHistoryMessages.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	Margins,
	States,
	StatesIcon,
	StatesSubtitle,
	StatesTitle,
	TextInput,
	Throbber,
} from '@rocket.chat/fuselage';
import { useDebouncedValue, useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { VirtualizedScrollbars, ContextualbarContent, ContextualbarEmptyContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useSetting, useUserPreference } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import { isMessageNewDay } from '../../../../room/MessageList/lib/isMessageNewDay';
import { isMessageSequential } from '../../../../room/MessageList/lib/isMessageSequential';
import ContactHistoryMessage from '../../../contactHistory/MessageList/ContactHistoryMessage';
import { useHistoryMessageList } from '../../../contactHistory/MessageList/useHistoryMessageList';

type ContactHistoryMessagesListProps = {
	chatId: string;
	onBack: () => void;
	onOpenRoom?: () => void;
};

const ContactInfoHistoryMessages = ({ chatId, onBack, onOpenRoom }: ContactHistoryMessagesListProps) => {
    /* Implementation Hidden */
};

export default ContactInfoHistoryMessages;

```