## File: apps/meteor/app/oauth2-server-config/server/admin/functions/addOAuthApp.ts

```typescript
import type { IOAuthApps, IUser } from '@rocket.chat/core-typings';
import { OAuthApps, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { Meteor } from 'meteor/meteor';

import { parseUriList } from './parseUriList';
import type { OauthAppsAddParams } from '../../../../../server/api/v1/oauthapps';
import { hasPermissionAsync } from '../../../../../server/lib/authorization/hasPermission';

export async function addOAuthApp(applicationParams: OauthAppsAddParams, uid: IUser['_id'] | undefined): Promise<IOAuthApps> {
    /* Implementation Hidden */
}

```