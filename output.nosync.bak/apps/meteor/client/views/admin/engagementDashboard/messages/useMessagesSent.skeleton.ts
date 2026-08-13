## File: apps/meteor/client/views/admin/engagementDashboard/messages/useMessagesSent.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import type { Period } from '../../../../components/dashboards/periods';
import { getPeriodRange } from '../../../../components/dashboards/periods';

type UseMessagesSentOptions = { period: Period['key']; utc: boolean };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMessagesSent = ({ period, utc }: UseMessagesSentOptions) => {
    /* Implementation Hidden */
};

```