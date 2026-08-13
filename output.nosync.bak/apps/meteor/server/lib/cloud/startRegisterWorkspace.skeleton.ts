## File: apps/meteor/server/lib/cloud/startRegisterWorkspace.ts

```typescript
import { Settings } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { buildWorkspaceRegistrationData } from './buildRegistrationData';
import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { syncWorkspace } from './syncWorkspace';
import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { updateAuditedBySystem } from '../../settings/lib/auditedSettingUpdates';
import { SystemLogger } from '../logger/system';

export async function startRegisterWorkspace(resend = false) {
    /* Implementation Hidden */
}

```