## File: ee/packages/license/src/validation/isReadyForValidation.ts

```typescript
import type { LicenseManager } from '../license';
import { hasAllDataCounters } from './getCurrentValueForLicenseLimit';

// Can only validate licenses once the workspace URL and the data counter functions are set
export function isReadyForValidation(this: LicenseManager) {
    /* Implementation Hidden */
}

```