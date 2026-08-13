## File: apps/meteor/client/views/outlookCalendar/OutlookCalendarEventModal.tsx

```typescript
import { GenericModal, GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';

import OutlookEventItemContent from './OutlookEventsList/OutlookEventItemContent';
import { useOutlookOpenCall } from './hooks/useOutlookOpenCall';

type OutlookCalendarEventModalProps = ComponentProps<typeof GenericModal> & {
	id?: string;
	subject?: string;
	meetingUrl?: string | null;
	description?: string;
};

const OutlookCalendarEventModal = ({ id, subject, meetingUrl, description, ...props }: OutlookCalendarEventModalProps) => {
    /* Implementation Hidden */
};

export default OutlookCalendarEventModal;

```