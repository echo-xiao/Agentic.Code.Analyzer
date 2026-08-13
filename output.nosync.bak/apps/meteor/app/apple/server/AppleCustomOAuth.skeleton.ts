## File: apps/meteor/app/apple/server/AppleCustomOAuth.ts

```typescript
import { MeteorError } from '@rocket.chat/core-services';
import { Accounts } from 'meteor/accounts-base';

import { CustomOAuth } from '../../custom-oauth/server/custom_oauth_server';
import { settings } from '../../settings/server';
import { handleIdentityToken } from '../lib/handleIdentityToken';

export class AppleCustomOAuth extends CustomOAuth {
	override async getIdentity(_accessToken: string, query: Record<string, any>): Promise<any> {
        /* Implementation Hidden */
    }
}

```