## File: apps/meteor/server/lib/rooms/banUserFromRoom.ts

```typescript
import { Message, Team } from '@rocket.chat/core-services';
import { isBannedSubscription } from '@rocket.chat/core-typings';
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { Rooms, Subscriptions, Users } from '@rocket.chat/models';

import { notifyOnRoomChangedById, notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { afterBanFromRoomCallback } from '../callbacks/afterBanFromRoomCallback';
import { removeUserFromRolesAsync } from '../roles/removeUserFromRoles';

/**
 * Bans a user from a room when triggered by federation or other external events.
 * Executes only the necessary database operations, with no callbacks, to prevent
 * propagation loops during external event processing.
 * `byUser` must be the Rocket.Chat user who initiated the ban (local record).
 */
export const performUserBan = async function (room: IRoom, user: IUser, byUser: IUser): Promise<void> {
    /* Implementation Hidden */
};

/**
 * Bans a user from the given room by updating the subscription status to BANNED,
 * removing them from member listings, and triggering all standard callbacks.
 * Used for local actions (UI or API) that should propagate normally to federation
 * and other subscribers.
 */
export const banUserFromRoom = async function (rid: string, user: IUser, byUser: IUser): Promise<void> {
    /* Implementation Hidden */
};

```