## File: apps/meteor/client/views/root/hooks/customOAuth/useGitLabOAuth.ts

```typescript
import type { OauthConfig } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { CustomOAuth } from '../../../../lib/customOAuth/CustomOAuth';

const config = {
	serverURL: 'https://gitlab.com',
	identityPath: '/api/v4/user',
	scope: 'read_user',
	mergeUsers: false,
	addAutopublishFields: {
		forLoggedInUser: ['services.gitlab'],
		forOtherUsers: ['services.gitlab.username'],
	},
	accessTokenParam: 'access_token',
} as const satisfies OauthConfig;

const Gitlab = CustomOAuth.configureOAuthService('gitlab', config);

export const useGitLabOAuth = () => {
    /* Implementation Hidden */
};

```