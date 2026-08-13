## File: apps/meteor/client/views/outlookCalendar/OutlookEventsList/OutlookEventItem.tsx

```typescript
import type { ICalendarEvent, Serialized } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Palette } from '@rocket.chat/fuselage';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';
import { usePreventPropagation } from '../../../hooks/usePreventPropagation';
import OutlookCalendarEventModal from '../OutlookCalendarEventModal';
import { useOutlookOpenCall } from '../hooks/useOutlookOpenCall';

type OutlookEventItemProps = Serialized<ICalendarEvent>;

const hovered = css`
	&:hover {
		cursor: pointer;
	}

	&:hover,
	&:focus {
		background: ${Palette.surface['surface-hover']};
	}
`;

const OutlookEventItem = ({ subject, description, startTime, meetingUrl }: OutlookEventItemProps) => {
    /* Implementation Hidden */
};

export default OutlookEventItem;

```