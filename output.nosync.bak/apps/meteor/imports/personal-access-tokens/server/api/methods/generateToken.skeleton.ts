## File: apps/meteor/imports/personal-access-tokens/server/api/methods/generateToken.ts

```typescript
import { Meteor } from 'meteor/meteor';
import { Random } from '@rocket.chat/random';
import { Accounts } from 'meteor/accounts-base';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { twoFactorRequired } from '../../../../../app/2fa/server/twoFactorRequired';
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'personalAccessTokens:generateToken'(params: { tokenName: string; bypassTwoFactor: boolean }): Promise<string>;
	}
}

export const generatePersonalAccessTokenOfUser = async ({
	bypassTwoFactor,
	tokenName,
	userId,
}: {
	tokenName: string;
	userId: string;
	bypassTwoFactor: boolean;
}): Promise<string> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	'personalAccessTokens:generateToken': twoFactorRequired(async function ({
		tokenName,
		bypassTwoFactor,
	}: {
		tokenName: string;
		bypassTwoFactor: boolean;
	}) {
		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('not-authorized', 'Not Authorized', {
				method: 'personalAccessTokens:generateToken',
			});
		}

		return generatePersonalAccessTokenOfUser({ tokenName, userId: uid, bypassTwoFactor });
	}),
});

```