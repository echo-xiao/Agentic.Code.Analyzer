## File: apps/meteor/server/lib/users/unarchiveUserSubscriptions.ts

```typescript
import { Rooms, Subscriptions } from '@rocket.chat/models';

const BATCH_SIZE = 100_000;

async function getArchivedRoomIds(rids: string[]): Promise<Set<string>> {
    /* Implementation Hidden */
}

async function unarchiveSubscriptionsByIds(ids: string[]): Promise<void> {
    /* Implementation Hidden */
}

export const unarchiveUserSubscriptions = async (userId: string): Promise<boolean> => {
    /* Implementation Hidden */
};

```