## File: ee/packages/license/src/validation/validateLicenseLimits.ts

```typescript
import type { ILicenseV3, BehaviorWithContext, LicenseValidationOptions } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { validateLimits } from './validateLimits';

export async function validateLicenseLimits(
	this: LicenseManager,
	license: ILicenseV3,
	options: LicenseValidationOptions,
): Promise<BehaviorWithContext[]> {
    /* Implementation Hidden */
}

```