## File: ee/packages/license/src/validation/filterBehaviorsResult.ts

```typescript
import type { BehaviorWithContext, LicenseBehavior } from '@rocket.chat/core-typings';

export const filterBehaviorsResult = (result: BehaviorWithContext[], expectedBehaviors: LicenseBehavior[]) =>
	result.filter(({ behavior }) => expectedBehaviors.includes(behavior));

```