## File: apps/meteor/client/meteor/startup/accounts.ts

```typescript
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { t } from '../../../app/utils/lib/i18n';
import { PublicSettingsCachedStore, SubscriptionsCachedStore } from '../../cachedStores';
import { getDdpSdk } from '../../lib/sdk/ddpSdk';
import { FORGET_SESSION_SETTING_ID } from '../../lib/sdk/meteorBackedSdk';
import { settings } from '../../lib/settings';
import { dispatchToastMessage } from '../../lib/toast';
import { userIdStore } from '../../lib/user';
import { useUserDataSyncReady } from '../../lib/userData';

// Meteor's accounts-password package registers `verifyEmail` server-side; declare
// it here so the typed `sdk.call` accepts it from client code.
declare module '@rocket.chat/ddp-client' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		verifyEmail(token: string): void;
	}
}

const whenMainReady = (): Promise<void> => {
    /* Implementation Hidden */
};

let configuredStorageBackend: 'local' | 'session' = 'local';

const applyForgetSessionOnWindowClose = (): void => {
    /* Implementation Hidden */
};

applyForgetSessionOnWindowClose();
settings.observe(FORGET_SESSION_SETTING_ID, applyForgetSessionOnWindowClose);

getDdpSdk().account.onEmailVerificationLink(async (token: string) => {
	try {
		await sdk.call('verifyEmail', token);
		await whenMainReady();
		void sdk.call('afterVerifyEmail');
		dispatchToastMessage({ type: 'success', message: t('Email_verified') });
	} catch (error) {
		await whenMainReady();
		dispatchToastMessage({ type: 'error', message: error });
		throw new Error('verify-email: E-mail not verified', { cause: error });
	}
});

```