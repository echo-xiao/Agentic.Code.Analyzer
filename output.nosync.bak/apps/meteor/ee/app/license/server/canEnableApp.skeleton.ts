## File: apps/meteor/ee/app/license/server/canEnableApp.ts

```typescript
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';
import { Apps } from '@rocket.chat/core-services';
import type { LicenseModule } from '@rocket.chat/core-typings';
import { License, type LicenseImp } from '@rocket.chat/license';

import { getInstallationSourceFromAppStorageItem } from '../../../../lib/apps/getInstallationSourceFromAppStorageItem';

type _canEnableAppDependencies = {
	Apps: typeof Apps;
	License: LicenseImp;
};

export const _canEnableApp = async ({ Apps, License }: _canEnableAppDependencies, app: IAppStorageItem): Promise<void> => {
    /* Implementation Hidden */
};

export const canEnableApp = async (app: IAppStorageItem): Promise<void> => _canEnableApp({ Apps, License }, app);

```