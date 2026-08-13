## File: apps/meteor/client/views/admin/engagementDashboard/channels/useChannelsList.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Period } from '../../../../components/dashboards/periods';
import { getPeriodRange } from '../../../../components/dashboards/periods';

type UseChannelsListOptions = {
	period: Period['key'];
	offset: number;
	count: number;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useChannelsList = ({ period, offset, count }: UseChannelsListOptions) => {
    /* Implementation Hidden */
};

```