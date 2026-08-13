## File: apps/meteor/app/apps/server/bridges/internalFederation.ts

```typescript
import type { IInternalFederationBridge } from '@rocket.chat/apps/dist/server/bridges/IInternalFederationBridge';
import { FederationKeys } from '@rocket.chat/models';

export class AppInternalFederationBridge implements IInternalFederationBridge {
	async getPrivateKey(): Promise<string | null> {
        /* Implementation Hidden */
    }

	async getPublicKey(): Promise<string | null> {
        /* Implementation Hidden */
    }
}

```