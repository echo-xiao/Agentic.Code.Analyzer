## File: packages/apps/src/server/marketplace/license/Crypto.ts

```typescript
import { publicDecrypt } from 'node:crypto';

import type { IInternalBridge } from '../../bridges';

export class Crypto {
	constructor(private readonly internalBridge: IInternalBridge) {
        /* Implementation Hidden */
    }

	public async decryptLicense(content: string): Promise<object> {
        /* Implementation Hidden */
    }
}

```