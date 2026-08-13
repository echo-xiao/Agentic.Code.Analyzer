## File: apps/meteor/ee/app/license/server/license.internalService.ts

```typescript
import type { ILicense } from '@rocket.chat/core-services';
import { api, ServiceClassInternal } from '@rocket.chat/core-services';
import type { LicenseModule } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';

import { resetEnterprisePermissions } from '../../../server/lib/authorization/resetEnterprisePermissions';
import { guestPermissions } from '../../authorization/lib/guestPermissions';

export class LicenseService extends ServiceClassInternal implements ILicense {
	protected name = 'license';

	constructor() {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	hasModule(feature: LicenseModule): boolean {
        /* Implementation Hidden */
    }

	hasValidLicense(): boolean {
        /* Implementation Hidden */
    }

	getModules(): string[] {
        /* Implementation Hidden */
    }

	getGuestPermissions(): string[] {
        /* Implementation Hidden */
    }
}

```