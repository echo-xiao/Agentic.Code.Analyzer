## File: apps/meteor/ee/server/lib/engagementDashboard/startup.ts

```typescript
import { fillFirstDaysOfMessagesIfNeeded, handleMessagesDeleted, handleMessagesSent } from './messages';
import { fillFirstDaysOfUsersIfNeeded, handleUserCreated } from './users';
import { callbacks } from '../../../../server/lib/callbacks';

export const attachCallbacks = (): void => {
    /* Implementation Hidden */
};

export const detachCallbacks = (): void => {
    /* Implementation Hidden */
};

export const prepareAnalytics = async (): Promise<void> => {
    /* Implementation Hidden */
};

```