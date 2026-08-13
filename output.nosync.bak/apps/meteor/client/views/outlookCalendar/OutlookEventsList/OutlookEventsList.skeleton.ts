## File: apps/meteor/client/views/outlookCalendar/OutlookEventsList/OutlookEventsList.tsx

```typescript
import { Box, States, StatesIcon, StatesTitle, StatesSubtitle, ButtonGroup, Button, Throbber } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation, useUser } from '@rocket.chat/ui-contexts';
import { Virtuoso } from 'react-virtuoso';

import OutlookEventItem from './OutlookEventItem';
import { getErrorMessage } from '../../../lib/errorHandling';
import { useOutlookAuthentication } from '../hooks/useOutlookAuthentication';
import { useMutationOutlookCalendarSync, useOutlookCalendarListForToday } from '../hooks/useOutlookCalendarList';
import { NotOnDesktopError } from '../lib/NotOnDesktopError';

type OutlookEventsListProps = {
	onClose: () => void;
	changeRoute: () => void;
};

const OutlookEventsList = ({ onClose, changeRoute }: OutlookEventsListProps) => {
    /* Implementation Hidden */
};

export default OutlookEventsList;

```