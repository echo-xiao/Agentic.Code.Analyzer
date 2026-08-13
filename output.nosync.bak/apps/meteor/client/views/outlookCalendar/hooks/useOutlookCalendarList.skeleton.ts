## File: apps/meteor/client/views/outlookCalendar/hooks/useOutlookCalendarList.ts

```typescript
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useOutlookAuthenticationMutation } from './useOutlookAuthentication';
import { syncOutlookEvents } from '../lib/syncOutlookEvents';

export const useOutlookCalendarListForToday = () => {
    /* Implementation Hidden */
};

export const useOutlookCalendarList = (date: Date) => {
    /* Implementation Hidden */
};

export const useMutationOutlookCalendarSync = () => {
    /* Implementation Hidden */
};

```