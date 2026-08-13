## File: apps/meteor/ee/server/lib/apps/disableAppsWithAddonsCallback.ts

```typescript
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { LicenseImp } from '@rocket.chat/license';

import { i18n } from '../../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../../server/lib/sendMessagesToAdmins';
import { Apps } from '../../apps';

type OnModuleCallbackParameter = Parameters<Parameters<LicenseImp['onModule']>[0]>[0];

export async function _disableAppsWithAddonsCallback(
	deps: { Apps: typeof Apps; sendMessagesToAdmins: typeof sendMessagesToAdmins },
	{ module, external, valid }: OnModuleCallbackParameter,
) {
    /* Implementation Hidden */
}

export const disableAppsWithAddonsCallback = (ctx: OnModuleCallbackParameter) =>
	_disableAppsWithAddonsCallback({ Apps, sendMessagesToAdmins }, ctx);

```