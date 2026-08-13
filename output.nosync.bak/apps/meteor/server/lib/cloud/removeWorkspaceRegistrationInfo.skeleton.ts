## File: apps/meteor/server/lib/cloud/removeWorkspaceRegistrationInfo.ts

```typescript
import { Settings, WorkspaceCredentials } from '@rocket.chat/models';

import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { notifyOnSettingChangedById } from '../../../app/lib/server/lib/notifyListener';
import { updateAuditedBySystem } from '../../settings/lib/auditedSettingUpdates';

export async function removeWorkspaceRegistrationInfo() {
    /* Implementation Hidden */
}

```