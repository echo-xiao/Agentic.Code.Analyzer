## File: apps/meteor/client/views/omnichannel/contactHistory/MessageList/ContactHistoryMessagesList.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Icon,
	Margins,
	States,
	StatesIcon,
	StatesSubtitle,
	StatesTitle,
	TextInput,
	Throbber,
} from '@rocket.chat/fuselage';
import { useDebouncedValue, useResizeObserver } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarEmptyContent,
	ContextualbarDialog,
	ContextualbarFooter,
} from '@rocket.chat/ui-client';
import { useSetting, useUserPreference } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import ContactHistoryMessage from './ContactHistoryMessage';
import { useHistoryMessageList } from './useHistoryMessageList';
import { isMessageNewDay } from '../../../room/MessageList/lib/isMessageNewDay';
import { isMessageSequential } from '../../../room/MessageList/lib/isMessageSequential';

type ContactHistoryMessagesListProps = {
	chatId: string;
	onClose: () => void;
	onOpenRoom?: () => void;
};

const ContactHistoryMessagesList = ({ chatId, onClose, onOpenRoom }: ContactHistoryMessagesListProps) => {
    /* Implementation Hidden */
};

export default ContactHistoryMessagesList;

```