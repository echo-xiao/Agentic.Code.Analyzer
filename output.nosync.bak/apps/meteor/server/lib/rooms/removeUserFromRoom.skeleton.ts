## File: apps/meteor/server/lib/rooms/removeUserFromRoom.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { AppsEngineException } from '@rocket.chat/apps-engine/definition/exceptions';
import { Message, Team, Room } from '@rocket.chat/core-services';
import type { IRoom, IUser, MessageTypesValues } from '@rocket.chat/core-typings';
import { Subscriptions, Rooms } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { notifyOnRoomChangedById, notifyOnSubscriptionChanged } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { afterLeaveRoomCallback } from '../callbacks/afterLeaveRoomCallback';
import { beforeLeaveRoomCallback } from '../callbacks/beforeLeaveRoomCallback';

/**
 * Removes a user from a room when triggered by federation or other external events.
 * Executes only the necessary database operations, with no callbacks, to prevent
 * propagation loops during external event processing.
 */
export const performUserRemoval = async function (
	room: IRoom,
	user: IUser,
	options?: { byUser?: IUser; skipAppPreEvents?: boolean; customSystemMessage?: MessageTypesValues },
): Promise<void> {
    /* Implementation Hidden */
};

/**
 * Removes a user from the given room by performing the required database updates
 * and triggering all standard callbacks. Used for local actions (UI or API)
 * that should propagate normally to federation and other subscribers.
 */
export const removeUserFromRoom = async function (
	rid: string,
	user: IUser,
	options?: { byUser?: IUser; skipAppPreEvents?: boolean; customSystemMessage?: MessageTypesValues },
): Promise<void> {
    /* Implementation Hidden */
};

```