## File: packages/apps/src/server/errors/InvalidLicenseError.ts

```typescript
import type { AppLicenseValidationResult } from '../marketplace/license/AppLicenseValidationResult';

export class InvalidLicenseError extends Error {
	public constructor(public readonly validationResult: AppLicenseValidationResult) {
        /* Implementation Hidden */
    }
}

```