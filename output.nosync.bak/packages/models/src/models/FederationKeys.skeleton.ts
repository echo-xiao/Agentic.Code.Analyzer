## File: packages/models/src/models/FederationKeys.ts

```typescript
import type { FederationKey, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IFederationKeysModel } from '@rocket.chat/model-typings';
import type { Db, Collection } from 'mongodb';
import NodeRSA from 'node-rsa';

import { BaseRaw } from './BaseRaw';

export class FederationKeysRaw extends BaseRaw<FederationKey> implements IFederationKeysModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<FederationKey>>) {
        /* Implementation Hidden */
    }

	async getKey(type: FederationKey['type']): Promise<string | null> {
        /* Implementation Hidden */
    }

	loadKey(keyData: NodeRSA.Key, type: FederationKey['type']): NodeRSA {
        /* Implementation Hidden */
    }

	async generateKeys(): Promise<{
		privateKey: '' | NodeRSA | null;
		publicKey: '' | NodeRSA | null;
	}> {
        /* Implementation Hidden */
    }

	async getPrivateKey(): Promise<'' | NodeRSA | null> {
        /* Implementation Hidden */
    }

	getPrivateKeyString(): Promise<string | null> {
        /* Implementation Hidden */
    }

	async getPublicKey(): Promise<'' | NodeRSA | null> {
        /* Implementation Hidden */
    }

	getPublicKeyString(): Promise<string | null> {
        /* Implementation Hidden */
    }
}

```