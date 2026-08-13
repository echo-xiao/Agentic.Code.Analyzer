## File: apps/meteor/client/views/navigation/sidepanel/hooks/useChannelsChildrenList.ts

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useShallow } from 'zustand/shallow';

import { pipe } from '../../../../lib/cachedStores/pipe';
import { Subscriptions } from '../../../../stores';
import { isUnreadSubscription } from '../../contexts/RoomsNavigationContext';

const sortByLmPipe = pipe<SubscriptionWithRoom>().sortByField('lm', -1);

/**
 * This helper function is used to ensure that the main room (main team room or parent's discussion room)
 * is always at the top of the list.
 */
const getMainRoomAndSort = (records: SubscriptionWithRoom[], unreadOnly: boolean, teamId?: string) => {
    /* Implementation Hidden */
};

export const useChannelsChildrenList = (parentRid: string, unreadOnly: boolean, teamId?: string) => {
    /* Implementation Hidden */
};

```