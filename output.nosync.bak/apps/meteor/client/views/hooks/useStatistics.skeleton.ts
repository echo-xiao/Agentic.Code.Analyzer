## File: apps/meteor/client/views/hooks/useStatistics.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

type UseStatisticsOptions = {
	refresh?: 'false' | 'true';
};

export const useStatistics = ({ refresh }: UseStatisticsOptions = { refresh: 'false' }) => {
    /* Implementation Hidden */
};

```