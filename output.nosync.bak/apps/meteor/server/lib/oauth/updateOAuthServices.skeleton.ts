## File: apps/meteor/server/lib/oauth/updateOAuthServices.ts

```typescript
import type {
	FacebookOAuthConfiguration,
	ILoginServiceConfiguration,
	LinkedinOAuthConfiguration,
	OAuthConfiguration,
	TwitterOAuthConfiguration,
} from '@rocket.chat/core-typings';
import { LoginServiceConfiguration } from '@rocket.chat/models';

import { logger } from './logger';
import { CustomOAuth } from '../../../app/custom-oauth/server/custom_oauth_server';
import {
	notifyOnLoginServiceConfigurationChanged,
	notifyOnLoginServiceConfigurationChangedByService,
} from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server/cached';

export async function updateOAuthServices(): Promise<void> {
    /* Implementation Hidden */
}

```