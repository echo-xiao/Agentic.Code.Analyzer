## File: packages/models/src/models/CredentialTokens.ts

```typescript
import type { ICredentialToken, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ICredentialTokensModel, InsertionModel } from '@rocket.chat/model-typings';
import type { Collection, Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CredentialTokensRaw extends BaseRaw<ICredentialToken> implements ICredentialTokensModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ICredentialToken>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async create(_id: string, userInfo: ICredentialToken['userInfo']): Promise<void> {
        /* Implementation Hidden */
    }

	findOneNotExpiredById(_id: string): Promise<ICredentialToken | null> {
        /* Implementation Hidden */
    }

	removeNotExpiredById(_id: string): Promise<ICredentialToken | null> {
        /* Implementation Hidden */
    }
}

```