## File: ee/packages/license/src/validation/getCurrentValueForLicenseLimit.ts

```typescript
import type { LicenseLimitKind, LimitContext } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { logger } from '../logger';
import { applyPendingLicense, hasPendingLicense } from '../pendingLicense';

export function setLicenseLimitCounter<T extends LicenseLimitKind>(
	this: LicenseManager,
	limitKey: T,
	fn: (context?: LimitContext<T>) => Promise<number> | number,
) {
    /* Implementation Hidden */
}

export async function getCurrentValueForLicenseLimit<T extends LicenseLimitKind>(
	this: LicenseManager,
	limitKey: T,
	context?: Partial<LimitContext<T>>,
): Promise<number> {
    /* Implementation Hidden */
}

export function hasAllDataCounters(this: LicenseManager) {
    /* Implementation Hidden */
}

```