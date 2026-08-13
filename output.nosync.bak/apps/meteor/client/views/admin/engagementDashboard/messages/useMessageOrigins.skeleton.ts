## File: apps/meteor/client/views/admin/engagementDashboard/messages/useMessageOrigins.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import type { Period } from '../../../../components/dashboards/periods';
import { getPeriodRange } from '../../../../components/dashboards/periods';

type UseMessageOriginsOptions = { period: Period['key'] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMessageOrigins = ({ period }: UseMessageOriginsOptions) => {
    /* Implementation Hidden */
};

```