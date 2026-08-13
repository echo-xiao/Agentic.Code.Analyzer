## File: apps/meteor/imports/personal-access-tokens/server/api/methods/removeToken.ts

```typescript
import { Meteor } from 'meteor/meteor';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';

import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';
import { twoFactorRequired } from '../../../../../app/2fa/server/twoFactorRequired';
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		'personalAccessTokens:removeToken'(params: { tokenName: string }): Promise<void>;
	}
}

export const removePersonalAccessTokenOfUser = async (tokenName: string, userId: string): Promise<void> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	'personalAccessTokens:removeToken': twoFactorRequired(async function ({ tokenName }: { tokenName: string }) {
		const uid = Meteor.userId();
		if (!uid) {
			throw new Meteor.Error('not-authorized', 'Not Authorized', {
				method: 'personalAccessTokens:removeToken',
			});
		}

		return removePersonalAccessTokenOfUser(tokenName, uid);
	}),
});

```