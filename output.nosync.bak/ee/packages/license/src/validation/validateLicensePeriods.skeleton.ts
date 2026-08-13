## File: ee/packages/license/src/validation/validateLicensePeriods.ts

```typescript
import type { ILicenseV3, BehaviorWithContext, LicenseValidationOptions } from '@rocket.chat/core-typings';

import { isBehaviorAllowed } from '../isItemAllowed';
import { logger } from '../logger';
import { getResultingBehavior } from './getResultingBehavior';

export const isPeriodInvalid = (from: string | undefined, until: string | undefined) => {
    /* Implementation Hidden */
};

export const validateLicensePeriods = (license: ILicenseV3, options: LicenseValidationOptions): BehaviorWithContext[] => {
    /* Implementation Hidden */
};

```