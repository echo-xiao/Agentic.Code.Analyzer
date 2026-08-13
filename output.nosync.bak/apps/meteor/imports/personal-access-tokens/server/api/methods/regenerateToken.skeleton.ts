## File: apps/meteor/imports/personal-access-tokens/server/api/methods/regenerateToken.ts

```typescript
import { Meteor } from 'meteor/meteor';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { isPersonalAccessToken } from '@rocket.chat/core-typings';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { twoFactorRequired } from '../../../../../app/2fa/server/twoFactorRequired';
import { removePersonalAccessTokenOfUser } from './removeToken';
import { generatePersonalAccessTokenOfUser } from './generateToken';
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'personalAccessTokens:regenerateToken'(params: { tokenName: string }): Promise<string>;
	}
}

export const regeneratePersonalAccessTokenOfUser = async (tokenName: string, userId: string): Promise<string> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	'personalAccessTokens:regenerateToken': twoFactorRequired(async function ({ tokenName }: { tokenName: string }) {
		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('not-authorized', 'Not Authorized', {
				method: 'personalAccessTokens:regenerateToken',
			});
		}

		return regeneratePersonalAccessTokenOfUser(tokenName, uid);
	}),
});

```