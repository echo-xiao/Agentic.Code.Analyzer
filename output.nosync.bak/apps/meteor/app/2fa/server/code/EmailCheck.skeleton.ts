## File: apps/meteor/app/2fa/server/code/EmailCheck.ts

```typescript
import { isOAuthUser, type IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import bcrypt from 'bcrypt';
import { Accounts } from 'meteor/accounts-base';

import type { ICodeCheck, IProcessInvalidCodeResult } from './ICodeCheck';
import { i18n } from '../../../../server/lib/i18n';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';

export class EmailCheck implements ICodeCheck {
	public readonly name = 'email';

	private getUserVerifiedEmails(user: IUser): string[] {
        /* Implementation Hidden */
    }

	public isEnabled(user: IUser): boolean {
        /* Implementation Hidden */
    }

	private async send2FAEmail(address: string, random: string, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	public async verify(user: IUser, codeFromEmail: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async sendEmailCode(user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	public async processInvalidCode(user: IUser): Promise<IProcessInvalidCodeResult> {
        /* Implementation Hidden */
    }

	public async maxFaildedAttemtpsReached(user: IUser) {
        /* Implementation Hidden */
    }
}

```