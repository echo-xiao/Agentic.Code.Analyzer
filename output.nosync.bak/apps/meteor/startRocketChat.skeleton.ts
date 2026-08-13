## File: apps/meteor/startRocketChat.ts

```typescript
import { startLicense } from './ee/app/license/server/startup';
import { registerEEBroker } from './ee/server';
import { startFederationService as startFederationMatrixService } from './ee/server/startup/federation';

const loadBeforeLicense = async () => {
    /* Implementation Hidden */
};

const loadAfterLicense = async () => {
    /* Implementation Hidden */
};

export const startRocketChat = async () => {
    /* Implementation Hidden */
};

```