## File: apps/meteor/server/lib/cloud/startRegisterWorkspaceSetupWizard.ts

```typescript
import type { CloudRegistrationIntentData } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';

import { buildWorkspaceRegistrationData } from './buildRegistrationData';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../logger/system';

export async function startRegisterWorkspaceSetupWizard(resend = false, email: string): Promise<CloudRegistrationIntentData> {
    /* Implementation Hidden */
}

```