## File: apps/meteor/server/lib/users/saveUserIdentity.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Messages, VideoConference, LivechatDepartmentAgents, Rooms, Subscriptions, Users, CallHistory } from '@rocket.chat/models';
import type { ClientSession } from 'mongodb';

import { setRealName } from './setRealName';
import { _setUsername } from './setUsername';
import { FileUpload } from '../../../app/file-upload/server';
import {
	notifyOnRoomChangedByUsernamesOrUids,
	notifyOnSubscriptionChangedByUserId,
	notifyOnSubscriptionChangedByNameAndRoomType,
} from '../../../app/lib/server/lib/notifyListener';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';
import { SystemLogger } from '../logger/system';
import { updateGroupDMsName } from '../rooms/updateGroupDMsName';
import { validateName } from '../shared/validateName';

/**
 *
 * @param {object} changes changes to the user
 */

export async function saveUserIdentity({
	_id,
	name: rawName,
	username: rawUsername,
	updateUsernameInBackground = false,
	updater,
	session,
}: {
	_id: string;
	name?: string;
	username?: string;
	updateUsernameInBackground?: boolean; // TODO: remove this
	updater?: Updater<IUser>;
	session?: ClientSession;
}) {
    /* Implementation Hidden */
}

async function updateUsernameReferences({
	username,
	previousUsername,
	rawUsername,
	usernameChanged,
	user,
	name,
	previousName,
	rawName,
	nameChanged,
}: {
	username: string;
	previousUsername: string;
	rawUsername?: string;
	usernameChanged: boolean;
	user: IUser;
	name: string;
	previousName: string | undefined;
	rawName?: string;
	nameChanged: boolean;
}): Promise<void> {
    /* Implementation Hidden */
}

```