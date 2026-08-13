## File: apps/meteor/server/services/federation/utils.ts

```typescript
import { settings } from '../../../app/settings/server';

export function isFederationEnabled(): boolean {
    /* Implementation Hidden */
}

export function throwIfFederationNotEnabled(): void {
    /* Implementation Hidden */
}

export class FederationMatrixInvalidConfigurationError extends Error {
	constructor(cause?: string) {
        /* Implementation Hidden */
    }
}

```