## File: apps/meteor/client/views/root/hooks/customOAuth/useNextcloudOAuth.ts

```typescript
import type { OauthConfig } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { CustomOAuth } from '../../../../lib/customOAuth/CustomOAuth';

const config = {
	serverURL: '',
	tokenPath: '/index.php/apps/oauth2/api/v1/token',
	tokenSentVia: 'header',
	authorizePath: '/index.php/apps/oauth2/authorize',
	identityPath: '/ocs/v2.php/cloud/user?format=json',
	scope: 'openid',
	addAutopublishFields: {
		forLoggedInUser: ['services.nextcloud'],
		forOtherUsers: ['services.nextcloud.name'],
	},
} as const satisfies OauthConfig;

const Nextcloud = CustomOAuth.configureOAuthService('nextcloud', config);

export const useNextcloudOAuth = (): void => {
    /* Implementation Hidden */
};

```