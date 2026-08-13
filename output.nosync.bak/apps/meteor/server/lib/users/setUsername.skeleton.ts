## File: apps/meteor/server/lib/users/setUsername.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { isUserNativeFederated } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Invites, Users, Subscriptions } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';
import _ from 'underscore';

import { checkUsernameAvailability } from './checkUsernameAvailability';
import { getAvatarSuggestionForUser } from './getAvatarSuggestionForUser';
import { saveUserIdentity } from './saveUserIdentity';
import { setUserAvatar } from './setUserAvatar';
import { validateUsername } from './validateUsername';
import { notifyOnUserChange } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';
import { callbacks } from '../callbacks';
import { SystemLogger } from '../logger/system';
import { addUserToRoom } from '../rooms/addUserToRoom';
import { joinDefaultChannels } from '../rooms/joinDefaultChannels';

const isUserInFederatedRooms = async (userId: string): Promise<boolean> => {
    /* Implementation Hidden */
};

export const setUsernameWithValidation = async (userId: string, username: string, joinDefaultChannelsSilenced?: boolean): Promise<void> => {
    /* Implementation Hidden */
};

export const _setUsername = async function (
	userId: string,
	u: string,
	fullUser: IUser,
	updater?: Updater<IUser>,
	session?: ClientSession,
): Promise<unknown> {
    /* Implementation Hidden */
};

```