## File: apps/meteor/client/views/root/hooks/customOAuth/useGitHubEnterpriseOAuth.ts

```typescript
import type { OauthConfig } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { CustomOAuth } from '../../../../lib/customOAuth/CustomOAuth';

// GitHub Enterprise Server CallBack URL needs to be http(s)://{rocketchat.server}[:port]/_oauth/github_enterprise
// In RocketChat -> Administration the URL needs to be http(s)://{github.enterprise.server}/

const config = {
	serverURL: '',
	identityPath: '/api/v3/user',
	authorizePath: '/login/oauth/authorize',
	tokenPath: '/login/oauth/access_token',
	addAutopublishFields: {
		forLoggedInUser: ['services.github-enterprise'],
		forOtherUsers: ['services.github-enterprise.username'],
	},
} as const satisfies OauthConfig;

const GitHubEnterprise = CustomOAuth.configureOAuthService('github_enterprise', config);

export const useGitHubEnterpriseOAuth = () => {
    /* Implementation Hidden */
};

```