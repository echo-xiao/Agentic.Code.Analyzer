## File: packages/models/src/models/OAuthAuthCodes.ts

```typescript
import type { IOAuthAuthCode, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IOAuthAuthCodesModel } from '@rocket.chat/model-typings';
import type { Db, Collection, DeleteResult, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class OAuthAuthCodesRaw extends BaseRaw<IOAuthAuthCode> implements IOAuthAuthCodesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOAuthAuthCode>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByAuthCode(authCode: string, options?: FindOptions<IOAuthAuthCode>): Promise<IOAuthAuthCode | null> {
        /* Implementation Hidden */
    }

	async deleteByUserId(userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async deleteByUserIds(userIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```