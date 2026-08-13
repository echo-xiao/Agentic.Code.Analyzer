## File: ee/packages/license/src/validation/validateLimits.ts

```typescript
import type { ILicenseV3, LicenseLimitKind, BehaviorWithContext, LicenseValidationOptions } from '@rocket.chat/core-typings';

import { isLimitAllowed, isBehaviorAllowed } from '../isItemAllowed';
import type { LicenseManager } from '../license';
import { logger } from '../logger';
import { getCurrentValueForLicenseLimit } from './getCurrentValueForLicenseLimit';
import { getResultingBehavior } from './getResultingBehavior';
import { logKind } from './logKind';
import { validateLimit } from './validateLimit';

export async function validateLimits(
	this: LicenseManager,
	limits: ILicenseV3['limits'],
	options: LicenseValidationOptions,
): Promise<BehaviorWithContext[]> {
    /* Implementation Hidden */
}

```