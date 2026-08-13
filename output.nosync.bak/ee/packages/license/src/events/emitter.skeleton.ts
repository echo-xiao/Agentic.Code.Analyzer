## File: ee/packages/license/src/events/emitter.ts

```typescript
import type { BehaviorWithContext, LicenseModule } from '@rocket.chat/core-typings';

import type { LicenseManager } from '../license';
import { logger } from '../logger';
import { isInternalModuleName } from '../modules';

export function moduleValidated(this: LicenseManager, module: LicenseModule) {
    /* Implementation Hidden */
}

export function moduleRemoved(this: LicenseManager, module: LicenseModule) {
    /* Implementation Hidden */
}

export function behaviorTriggered(this: LicenseManager, options: BehaviorWithContext) {
    /* Implementation Hidden */
}

export function behaviorTriggeredToggled(this: LicenseManager, options: BehaviorWithContext) {
    /* Implementation Hidden */
}

export function licenseValidated(this: LicenseManager) {
    /* Implementation Hidden */
}

export function licenseInvalidated(this: LicenseManager) {
    /* Implementation Hidden */
}

```