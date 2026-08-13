## File: apps/meteor/server/methods/registerUser.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { Users } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { Match, check } from 'meteor/check';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Meteor } from 'meteor/meteor';

import { validateInviteToken } from '../../app/invites/server/functions/validateInviteToken';
import { validateEmailDomain, passwordPolicy, RateLimiter } from '../../app/lib/server';
import { settings } from '../../app/settings/server';
import { trim } from '../../lib/utils/stringUtils';

declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		registerUser(
			formData:
				| { email: string; pass: string; username: IUser['username']; name?: string; secretURL?: string; reason?: string }
				| { email?: null },
		):
			| {
					token: string;
					when: Date;
			  }
			| string;
	}
}

export const registerUser = async (
	formData:
		| { email: string; pass: string; username: IUser['username']; name?: string; secretURL?: string; reason?: string }
		| { email?: null },
): Promise<
	| {
			token: string;
			when: Date;
	  }
	| string
> => {
    /* Implementation Hidden */
};

Meteor.methods<ServerMethods>({
	async registerUser(formData) {
		return registerUser(formData);
	},
});

let registerUserRuleId = RateLimiter.limitMethod(
	'registerUser',
	settings.get('Rate_Limiter_Limit_RegisterUser'),
	settings.get('API_Enable_Rate_Limiter_Limit_Time_Default'),
	{
		userId() {
			return true;
		},
	},
);

settings.watch('Rate_Limiter_Limit_RegisterUser', (value) => {
	// When running on testMode, there's no rate limiting added, so this function throws an error
	if (process.env.TEST_MODE === 'true' || process.env.TEST_MODE === 'api') {
		return;
	}

	if (!registerUserRuleId) {
		throw new Error('Rate limiter rule for "registerUser" not found');
	}
	// remove old DDP rate limiter rule and create a new one with the updated setting value
	DDPRateLimiter.removeRule(registerUserRuleId);
	registerUserRuleId = RateLimiter.limitMethod('registerUser', value, settings.get('API_Enable_Rate_Limiter_Limit_Time_Default'), {
		userId() {
			return true;
		},
	});
});

```