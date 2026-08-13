## File: packages/models/src/models/OAuthRefreshTokens.ts

```typescript
import type { IOAuthRefreshToken, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IOAuthRefreshTokensModel } from '@rocket.chat/model-typings';
import type { Db, Collection, DeleteResult, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class OAuthRefreshTokensRaw extends BaseRaw<IOAuthRefreshToken> implements IOAuthRefreshTokensModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOAuthRefreshToken>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByRefreshToken(refreshToken: string, options?: FindOptions<IOAuthRefreshToken>): Promise<IOAuthRefreshToken | null> {
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