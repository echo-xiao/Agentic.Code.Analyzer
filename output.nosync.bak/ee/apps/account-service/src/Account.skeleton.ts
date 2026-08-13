## File: ee/apps/account-service/src/Account.ts

```typescript
import { ServiceClass, Settings } from '@rocket.chat/core-services';
import type { IAccount, ILoginResult } from '@rocket.chat/core-services';
import { getLoginExpirationInDays } from '@rocket.chat/tools';

import { loginViaResume } from './lib/loginViaResume';
import { removeSession } from './lib/removeSession';

export class Account extends ServiceClass implements IAccount {
	protected name = 'accounts';

	private loginExpiration = 90;

	constructor() {
        /* Implementation Hidden */
    }

	async login({ resume }: { resume: string }): Promise<false | ILoginResult> {
        /* Implementation Hidden */
    }

	async logout({ userId, token }: { userId: string; token: string }): Promise<void> {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }
}

```