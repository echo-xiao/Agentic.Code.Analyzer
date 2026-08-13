## File: apps/meteor/server/lib/rooms/acceptRoomInvite.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { Message } from '@rocket.chat/core-services';
import type { IUser, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { Subscriptions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnSubscriptionChangedById } from '../../../app/lib/server/lib/notifyListener';
import { callbacks } from '../callbacks';

/**
 * Accepts a room invite when triggered by internal events such as federation
 * or third-party callbacks. Performs the necessary database updates and triggers
 * safe callbacks, ensuring no propagation loops are created during external event
 * processing.
 */

// TODO this funcion is pretty much the same as the one in addUserToRoom.ts, we should probably
// unify them at some point
export const performAcceptRoomInvite = async (
	room: IRoom,
	subscription: ISubscription,
	user: IUser & { username: string },
): Promise<void> => {
    /* Implementation Hidden */
};

```