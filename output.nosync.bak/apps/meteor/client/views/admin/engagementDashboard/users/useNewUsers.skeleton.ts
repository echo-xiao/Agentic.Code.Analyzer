## File: apps/meteor/client/views/admin/engagementDashboard/users/useNewUsers.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import type { Period } from '../../../../components/dashboards/periods';
import { getPeriodRange } from '../../../../components/dashboards/periods';

export const useNewUsers = ({ period, utc }: { period: Period['key']; utc: boolean }) => {
    /* Implementation Hidden */
};

```