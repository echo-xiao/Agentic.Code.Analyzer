## File: ee/packages/license/src/validation/getModulesToDisable.ts

```typescript
import type { BehaviorWithContext, LicenseBehavior, LicenseModule } from '@rocket.chat/core-typings';

const filterValidationResult = (result: BehaviorWithContext[], expectedBehavior: LicenseBehavior) =>
	result.filter(({ behavior }) => behavior === expectedBehavior) as BehaviorWithContext[];

export const getModulesToDisable = (validationResult: BehaviorWithContext[]): LicenseModule[] => {
    /* Implementation Hidden */
};

```