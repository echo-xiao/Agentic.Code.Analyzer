## File: ee/packages/license/src/validation/validateLicenseUrl.ts

```typescript
import type { ILicenseV3, BehaviorWithContext, LicenseValidationOptions } from '@rocket.chat/core-typings';

import { isBehaviorAllowed } from '../isItemAllowed';
import type { LicenseManager } from '../license';
import { logger } from '../logger';
import { getResultingBehavior } from './getResultingBehavior';

const validateRegex = (licenseURL: string, url: string) => {
    /* Implementation Hidden */
};

const validateUrl = (licenseURL: string, url: string) => {
    /* Implementation Hidden */
};

const validateHash = (licenseURL: string, hashedUrl: string) => {
    /* Implementation Hidden */
};

export function validateLicenseUrl(this: LicenseManager, license: ILicenseV3, options: LicenseValidationOptions): BehaviorWithContext[] {
    /* Implementation Hidden */
}

```