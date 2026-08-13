## File: packages/apps/src/server/managers/AppSignatureManager.ts

```typescript
import { createHash } from 'node:crypto';

import * as jose from 'jose';

import type { AppManager } from '../AppManager';
import type { IInternalFederationBridge } from '../bridges';
import type { IAppStorageItem } from '../storage';

export class AppSignatureManager {
	private readonly federationBridge: IInternalFederationBridge;

	private readonly checksumAlgorithm = 'SHA256';

	private readonly signingAlgorithm = 'RS512';

	private privateKey: string;

	private publicKey: string;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	public async verifySignedApp(app: IAppStorageItem): Promise<void> {
        /* Implementation Hidden */
    }

	public async signApp(app: IAppStorageItem): Promise<string> {
        /* Implementation Hidden */
    }

	private async getPrivateKey(): Promise<string> {
        /* Implementation Hidden */
    }

	private async getPublicKey(): Promise<string> {
        /* Implementation Hidden */
    }

	private calculateChecksumForApp(app: IAppStorageItem, alg = this.checksumAlgorithm): string {
        /* Implementation Hidden */
    }

	private getFieldsForChecksum(obj: IAppStorageItem): string {
        /* Implementation Hidden */
    }
}

```