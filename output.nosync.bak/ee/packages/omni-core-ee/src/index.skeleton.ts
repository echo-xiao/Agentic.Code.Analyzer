## File: ee/packages/omni-core-ee/src/index.ts

```typescript
import { isDepartmentCreationAvailablePatch } from './isDepartmentCreationAvailable';
import { applyDepartmentRestrictionsPatch } from './patches/applyDepartmentRestrictions';

export function patchOmniCore(): void {
    /* Implementation Hidden */
}

export * from './outbound-communication';
export * from './units/getUnitsFromUser';

```