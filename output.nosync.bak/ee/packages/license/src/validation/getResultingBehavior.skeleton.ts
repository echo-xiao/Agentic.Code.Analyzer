## File: ee/packages/license/src/validation/getResultingBehavior.ts

```typescript
import type { LicenseLimitKind, BehaviorWithContext, LicenseLimit, LicensePeriod } from '@rocket.chat/core-typings';

export const getResultingBehavior = (
	data: LicenseLimit | LicensePeriod | Partial<Omit<BehaviorWithContext, 'reason'>>,
	{ reason, limit }: { reason: BehaviorWithContext['reason']; limit?: LicenseLimitKind },
): BehaviorWithContext => {
    /* Implementation Hidden */
};

```