## File: ee/packages/license/src/isItemAllowed.ts

```typescript
import type { LicenseLimitKind, LicenseBehavior, LicenseValidationOptions } from '@rocket.chat/core-typings';

const isItemAllowed = <T>(item: T, allowList?: T[]): boolean => {
    /* Implementation Hidden */
};

export const isLimitAllowed = (item: LicenseLimitKind, options: LicenseValidationOptions): boolean => isItemAllowed(item, options.limits);

export const isBehaviorAllowed = (item: LicenseBehavior, options: LicenseValidationOptions): boolean =>
	isItemAllowed(item, options.behaviors) && (options.isNewLicense || item !== 'prevent_installation');

```