## File: apps/meteor/app/2fa/server/code/index.ts

```typescript
import crypto from 'node:crypto';

import type { IUser, IMethodConnection } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { EmailCheck } from './EmailCheck';
import type { ICodeCheck } from './ICodeCheck';
import { PasswordCheckFallback } from './PasswordCheckFallback';
import { TOTPCheck } from './TOTPCheck';
import { normalizeHeaders } from '../../../../server/lib/shared/getModifiedHttpHeaders';
import { settings } from '../../../settings/server';

export interface ITwoFactorOptions {
	disablePasswordFallback?: boolean;
	disableRememberMe?: boolean;
	requireSecondFactor?: boolean; // whether any two factor should be required
}

const totpCheck = new TOTPCheck();
export const emailCheck = new EmailCheck();
const passwordCheckFallback = new PasswordCheckFallback();

const checkMethods = new Map<string, ICodeCheck>();

checkMethods.set(totpCheck.name, totpCheck);
checkMethods.set(emailCheck.name, emailCheck);

function getMethodByNameOrFirstActiveForUser(user: IUser, name?: string): ICodeCheck | undefined {
    /* Implementation Hidden */
}

function getAvailableMethodNames(user: IUser): string[] {
    /* Implementation Hidden */
}

export async function getUserForCheck(userId: string): Promise<IUser | null> {
    /* Implementation Hidden */
}

export function getFingerprintFromConnection(connection: IMethodConnection): string {
    /* Implementation Hidden */
}

function getRememberDate(from: Date = new Date()): Date | undefined {
    /* Implementation Hidden */
}

function isAuthorizedForToken(connection: IMethodConnection, user: IUser, options: ITwoFactorOptions): boolean {
    /* Implementation Hidden */
}

async function rememberAuthorization(connection: IMethodConnection, user: IUser): Promise<void> {
    /* Implementation Hidden */
}

interface ICheckCodeForUser {
	user: IUser | string;
	code?: string;
	method?: string;
	options?: ITwoFactorOptions;
	connection?: IMethodConnection;
}

const getSecondFactorMethod = (user: IUser, method: string | undefined, options: ITwoFactorOptions): ICodeCheck | undefined => {
    /* Implementation Hidden */
};

export async function checkCodeForUser({ user, code, method, options = {}, connection }: ICheckCodeForUser): Promise<boolean> {
    /* Implementation Hidden */
}

```