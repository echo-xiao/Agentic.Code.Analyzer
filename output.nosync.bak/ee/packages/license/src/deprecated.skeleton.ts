## File: ee/packages/license/src/deprecated.ts

```typescript
import type { ILicenseV3, LicenseLimitKind } from '@rocket.chat/core-typings';

import type { LicenseManager } from './license';
import { getModules } from './modules';
import { defaultLimits } from './validation/validateDefaultLimits';

export const getLicenseLimit = (license: ILicenseV3 | undefined, kind: LicenseLimitKind) => {
    /* Implementation Hidden */
};

// #TODO: Remove references to those functions

export function getMaxActiveUsers(this: LicenseManager) {
    /* Implementation Hidden */
}

export function getAppsConfig(this: LicenseManager) {
    /* Implementation Hidden */
}

export function getUnmodifiedLicenseAndModules(this: LicenseManager) {
    /* Implementation Hidden */
}

```