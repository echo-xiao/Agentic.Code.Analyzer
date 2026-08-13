## File: apps/meteor/server/methods/saveUserProfile.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { UserStatus, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { UpdateFilter } from 'mongodb';

import { type AuthenticatedContext, twoFactorRequired } from '../../app/2fa/server/twoFactorRequired';
import { notifyOnUserChange } from '../../app/lib/server/lib/notifyListener';
import { passwordPolicy } from '../../app/lib/server/lib/passwordPolicy';
import { setEmailFunction } from '../../app/lib/server/methods/setEmail';
import { settings as rcSettings } from '../../app/settings/server';
import { setUserStatusMethod } from '../../app/user-status/server/methods/setUserStatus';
import { getUserInfo } from '../api/lib/getUserInfo';
import { callbacks } from '../lib/callbacks';
import { compareUserPassword } from '../lib/compareUserPassword';
import { compareUserPasswordHistory } from '../lib/compareUserPasswordHistory';
import { saveCustomFields } from '../lib/users/saveCustomFields';
import { validateUserEditing } from '../lib/users/saveUser';
import { saveUserIdentity } from '../lib/users/saveUserIdentity';

const MAX_BIO_LENGTH = 260;
const MAX_NICKNAME_LENGTH = 120;

async function saveUserProfile(
	this: AuthenticatedContext,
	settings: {
		email?: string;
		username?: string;
		realname?: string;
		newPassword?: string;
		statusText?: string;
		statusType?: string;
		bio?: string;
		nickname?: string;
	},
	customFields: Record<string, unknown>,
	..._: unknown[]
) {
    /* Implementation Hidden */
}

const saveUserProfileWithTwoFactor = twoFactorRequired(saveUserProfile, {
	requireSecondFactor: true,
});

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		saveUserProfile(
			settings: {
				email?: string;
				username?: string;
				realname?: string;
				newPassword?: string;
				statusText?: string;
				statusType?: string;
				bio?: string;
				nickname?: string;
			},
			customFields: Record<string, any>,
			...args: unknown[]
		): boolean;
	}
}

export function executeSaveUserProfile(
	this: AuthenticatedContext,
	user: IUser,
	settings: {
		email?: string;
		username?: string;
		realname?: string;
		newPassword?: string;
		statusText?: string;
		statusType?: string;
		bio?: string;
		nickname?: string;
	},
	customFields: Record<string, any> = {},
	...args: unknown[]
) {
    /* Implementation Hidden */
}

```