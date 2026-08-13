## File: apps/meteor/client/views/admin/engagementDashboard/messages/useTopFivePopularChannels.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import type { Period } from '../../../../components/dashboards/periods';
import { getPeriodRange } from '../../../../components/dashboards/periods';

type UseTopFivePopularChannelsOptions = { period: Period['key'] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTopFivePopularChannels = ({ period }: UseTopFivePopularChannelsOptions) => {
    /* Implementation Hidden */
};

```