## File: apps/meteor/server/lib/cloud/finishOAuthAuthorization.ts

```typescript
import { Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { Meteor } from 'meteor/meteor';

import { getRedirectUri } from './getRedirectUri';
import { userScopes } from '../../../app/cloud/server/oauthScopes';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../logger/system';

export async function finishOAuthAuthorization(code: string, state: string) {
    /* Implementation Hidden */
}

```