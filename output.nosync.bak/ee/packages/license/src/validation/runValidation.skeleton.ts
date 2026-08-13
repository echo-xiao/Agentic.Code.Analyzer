## File: ee/packages/license/src/validation/runValidation.ts

```typescript
import type { ILicenseV3, BehaviorWithContext, LicenseValidationOptions } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { validateLicenseLimits } from './validateLicenseLimits';
import { validateLicensePeriods } from './validateLicensePeriods';
import { validateLicenseUrl } from './validateLicenseUrl';

export async function runValidation(
	this: LicenseManager,
	license: ILicenseV3,
	options: LicenseValidationOptions,
): Promise<BehaviorWithContext[]> {
    /* Implementation Hidden */
}

```