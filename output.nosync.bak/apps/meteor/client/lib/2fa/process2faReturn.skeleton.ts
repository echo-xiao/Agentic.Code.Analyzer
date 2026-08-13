## File: apps/meteor/client/lib/2fa/process2faReturn.ts

```typescript
import { SHA256 } from '@rocket.chat/sha256';
import { imperativeModal } from '@rocket.chat/ui-client';
import { lazy } from 'react';

import type { LoginCallback } from './overrideLoginMethod';
import type { MeteorErrorLike } from './types';
import { isTotpInvalidError, isTotpRequiredError } from './utils';
import { getUser } from '../user';

const TwoFactorModal = lazy(() => import('../../components/TwoFactorModal'));

const twoFactorMethods = ['totp', 'email', 'password'] as const;

type TwoFactorMethod = (typeof twoFactorMethods)[number];

const isTwoFactorMethod = (method: string): method is TwoFactorMethod => twoFactorMethods.includes(method as TwoFactorMethod);

const hasRequiredTwoFactorMethod = (
	error: MeteorErrorLike,
): error is MeteorErrorLike & { details: { method: TwoFactorMethod; emailOrUsername?: string } } => {
    /* Implementation Hidden */
};

function assertModalProps(props: {
	method: TwoFactorMethod;
	emailOrUsername?: string;
}): asserts props is { method: 'totp' } | { method: 'password' } | { method: 'email'; emailOrUsername: string } {
    /* Implementation Hidden */
}

const getProps = (
	method: 'totp' | 'email' | 'password',
	emailOrUsername?: { username: string } | { email: string } | { id: string } | string,
) => {
    /* Implementation Hidden */
};

export async function process2faReturn({
	error,
	result,
	originalCallback,
	onCode,
	emailOrUsername,
}: {
	error: MeteorErrorLike | undefined;
	result: unknown;
	originalCallback: LoginCallback | undefined;
	onCode: (code: string, method: string) => void | Promise<void>;
	emailOrUsername: { username: string } | { email: string } | { id: string } | string | null | undefined;
}): Promise<void> {
    /* Implementation Hidden */
}

export async function process2faAsyncReturn<TResult>({
	error,
	onCode,
	emailOrUsername,
}: {
	error: unknown;
	onCode: (code: string, method: string) => TResult | Promise<TResult>;
	emailOrUsername: string | null | undefined;
}): Promise<TResult> {
    /* Implementation Hidden */
}

export const invokeTwoFactorModal = async (
	props: {
		method: 'totp' | 'email' | 'password';
		emailOrUsername?: string | undefined;
		invalidAttempt?: boolean;
	},
	validateCode?: (code: string, method: string) => Promise<void>,
) => {
    /* Implementation Hidden */
};

```