## File: apps/meteor/ee/app/license/server/lib/getAppCount.ts

```typescript
import { Apps } from '@rocket.chat/core-services';
import type { LicenseAppSources } from '@rocket.chat/core-typings';

import { getInstallationSourceFromAppStorageItem } from '../../../../../lib/apps/getInstallationSourceFromAppStorageItem';

export async function getAppCount(source: LicenseAppSources): Promise<number> {
    /* Implementation Hidden */
}

```