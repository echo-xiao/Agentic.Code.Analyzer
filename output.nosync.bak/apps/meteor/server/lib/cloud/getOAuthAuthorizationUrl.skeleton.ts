## File: apps/meteor/server/lib/cloud/getOAuthAuthorizationUrl.ts

```typescript
import { Settings } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';

import { getRedirectUri } from './getRedirectUri';
import { userScopes } from '../../../app/cloud/server/oauthScopes';
import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { updateAuditedBySystem } from '../../settings/lib/auditedSettingUpdates';

export async function getOAuthAuthorizationUrl() {
    /* Implementation Hidden */
}

```