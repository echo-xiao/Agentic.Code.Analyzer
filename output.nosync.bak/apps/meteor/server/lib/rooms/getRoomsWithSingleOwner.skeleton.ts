## File: apps/meteor/server/lib/rooms/getRoomsWithSingleOwner.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Subscriptions, Users } from '@rocket.chat/models';

import { subscriptionHasRole } from '../../../app/authorization/server';

export type SubscribedRoomsForUserWithDetails = {
	rid: string;
	t: string;
	shouldBeRemoved: boolean;
	shouldChangeOwner: boolean;
	userIsLastOwner: boolean;
	newOwner: IUser['_id'] | null;
};

export function shouldRemoveOrChangeOwner(subscribedRooms: SubscribedRoomsForUserWithDetails[]): boolean {
    /* Implementation Hidden */
}

export async function getSubscribedRoomsForUserWithDetails(
	userId: string,
	assignNewOwner = true,
	roomIds: string[] = [],
): Promise<SubscribedRoomsForUserWithDetails[]> {
    /* Implementation Hidden */
}

```