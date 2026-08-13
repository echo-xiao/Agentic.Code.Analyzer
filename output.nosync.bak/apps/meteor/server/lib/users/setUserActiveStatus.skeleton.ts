## File: apps/meteor/server/lib/users/setUserActiveStatus.ts

```typescript
import type { IUser, IUserEmail } from '@rocket.chat/core-typings';
import { isUserFederated, isDirectMessageRoom } from '@rocket.chat/core-typings';
import { Rooms, Users, Subscriptions, OAuthAccessTokens, OAuthRefreshTokens, OAuthAuthCodes } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { getUserSingleOwnedRooms } from './getUserSingleOwnedRooms';
import {
	notifyOnRoomChangedById,
	notifyOnRoomChangedByUserDM,
	notifyOnSubscriptionChangedByNameAndRoomType,
	notifyOnUserChange,
} from '../../../app/lib/server/lib/notifyListener';
import * as Mailer from '../../../app/mailer/server/api';
import { settings } from '../../../app/settings/server';
import { callbacks } from '../callbacks';
import { closeOmnichannelConversations } from '../omnichannel/closeOmnichannelConversations';
import { shouldRemoveOrChangeOwner, getSubscribedRoomsForUserWithDetails } from '../rooms/getRoomsWithSingleOwner';
import { relinquishRoomOwnerships } from '../rooms/relinquishRoomOwnerships';

async function reactivateDirectConversations(userId: string) {
    /* Implementation Hidden */
}

export async function setUserActiveStatus(
	userId: string,
	active: boolean,
	confirmRelinquish = false,
	executedBy?: string,
): Promise<boolean | undefined> {
    /* Implementation Hidden */
}

```