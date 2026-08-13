## File: apps/meteor/app/2fa/server/code/TOTPCheck.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import type { ICodeCheck, IProcessInvalidCodeResult } from './ICodeCheck';
import { settings } from '../../../settings/server';
import { TOTP } from '../lib/totp';

export class TOTPCheck implements ICodeCheck {
	public readonly name = 'totp';

	public isEnabled(user: IUser): boolean {
        /* Implementation Hidden */
    }

	public async verify(user: IUser, code: string): Promise<boolean> {
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