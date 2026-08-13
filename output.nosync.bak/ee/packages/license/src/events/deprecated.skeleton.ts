## File: ee/packages/license/src/events/deprecated.ts

```typescript
import type { LicenseModule } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { hasModule } from '../modules';

// #TODO: Remove this onLicense handler
export function onLicense(this: LicenseManager, feature: LicenseModule, cb: (...args: any[]) => void): void | Promise<void> {
    /* Implementation Hidden */
}

```