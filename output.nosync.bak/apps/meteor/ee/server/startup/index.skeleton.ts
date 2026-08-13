## File: apps/meteor/ee/server/startup/index.ts

```typescript
import '../../app/authorization/server';
import './audit';
import './deviceManagement';
import './engagementDashboard';
import './maxRoomsPerGuest';
import './upsell';
import './services';
import './readReceiptsArchive';
import { api } from '@rocket.chat/core-services';

import { isRunningMs } from '../../../server/lib/isRunningMs';

export const registerEEBroker = async (): Promise<void> => {
    /* Implementation Hidden */
};

```