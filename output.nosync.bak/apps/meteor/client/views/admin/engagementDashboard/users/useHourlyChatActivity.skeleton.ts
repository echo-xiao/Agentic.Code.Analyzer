## File: apps/meteor/client/views/admin/engagementDashboard/users/useHourlyChatActivity.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { endOfDay, subDays } from 'date-fns';

type UseHourlyChatActivityOptions = {
	displacement: number;
	utc: boolean;
};

function endOfDayUTC(d: Date): Date {
    /* Implementation Hidden */
}

export const useHourlyChatActivity = ({ displacement, utc }: UseHourlyChatActivityOptions) => {
    /* Implementation Hidden */
};

```