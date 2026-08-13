## File: packages/apps/tests/test-data/bridges/internalFederationBridge.ts

```typescript
import type { IInternalFederationBridge } from '../../../src/server/bridges';

export class TestsInternalFederationBridge implements IInternalFederationBridge {
	public async getPrivateKey(): Promise<string> {
        /* Implementation Hidden */
    }

	public async getPublicKey(): Promise<string> {
        /* Implementation Hidden */
    }
}

```