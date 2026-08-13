## File: packages/models/src/models/SamlUsedAssertions.ts

```typescript
import crypto from 'crypto';

import type { ISamlUsedAssertions, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ISamlUsedAssertionsModel } from '@rocket.chat/model-typings';
import type { MongoServerError, Collection, Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

const DUPLICATE_KEY_ERROR_CODE = 11000;

export class SamlUsedAssertionsRaw extends BaseRaw<ISamlUsedAssertions> implements ISamlUsedAssertionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ISamlUsedAssertions>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async markUsed(assertionId: string, issuer: string, expireAt: Date): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```