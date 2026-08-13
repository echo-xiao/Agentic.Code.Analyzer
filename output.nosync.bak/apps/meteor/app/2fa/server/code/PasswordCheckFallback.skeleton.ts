## File: apps/meteor/app/2fa/server/code/PasswordCheckFallback.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Accounts } from 'meteor/accounts-base';
import type { Meteor } from 'meteor/meteor';

import type { ICodeCheck, IProcessInvalidCodeResult } from './ICodeCheck';
import { settings } from '../../../settings/server';

export class PasswordCheckFallback implements ICodeCheck {
	public readonly name = 'password';

	public isEnabled(user: IUser, force: boolean): boolean {
        /* Implementation Hidden */
    }

	public async verify(user: IUser, code: string, force: boolean): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async processInvalidCode(): Promise<IProcessInvalidCodeResult> {
        /* Implementation Hidden */
    }

	public async maxFaildedAttemtpsReached(_user: IUser): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```