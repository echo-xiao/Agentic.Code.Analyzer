## File: apps/meteor/client/views/root/hooks/customOAuth/useWordPressOAuth.ts

```typescript
import type { OauthConfig } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { CustomOAuth } from '../../../../lib/customOAuth/CustomOAuth';

const configDefault = {
	serverURL: '',
	addAutopublishFields: {
		forLoggedInUser: ['services.wordpress'],
		forOtherUsers: ['services.wordpress.user_login'],
	},
	accessTokenParam: 'access_token',
} as const satisfies OauthConfig;

const WordPress = CustomOAuth.configureOAuthService('wordpress', configDefault);

const configureServerType = (
	serverType: string,
	identityPath?: string,
	identityTokenSentVia?: string,
	tokenPath?: string,
	authorizePath?: string,
	scope?: string,
): OauthConfig => {
    /* Implementation Hidden */
};

export const useWordPressOAuth = (): void => {
    /* Implementation Hidden */
};

```