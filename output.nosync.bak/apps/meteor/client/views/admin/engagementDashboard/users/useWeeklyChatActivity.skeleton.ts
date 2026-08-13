## File: apps/meteor/client/views/admin/engagementDashboard/users/useWeeklyChatActivity.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, subWeeks } from 'date-fns';

type UseWeeklyChatActivityOptions = {
	displacement: number;
	utc: boolean;
};

function endOfDayUTC(d: Date): Date {
    /* Implementation Hidden */
}

export const useWeeklyChatActivity = ({ displacement, utc }: UseWeeklyChatActivityOptions) => {
    /* Implementation Hidden */
};

```