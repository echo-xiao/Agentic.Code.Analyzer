## File: packages/models/src/models/OAuthAccessTokens.ts

```typescript
import type { IOAuthAccessToken, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IOAuthAccessTokensModel } from '@rocket.chat/model-typings';
import type { Db, Collection, DeleteResult, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class OAuthAccessTokensRaw extends BaseRaw<IOAuthAccessToken> implements IOAuthAccessTokensModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOAuthAccessToken>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findOneByAccessToken(accessToken: string, options?: FindOptions<IOAuthAccessToken>): Promise<IOAuthAccessToken | null> {
        /* Implementation Hidden */
    }

	async findOneByRefreshToken(refreshToken: string, options?: FindOptions<IOAuthAccessToken>): Promise<IOAuthAccessToken | null> {
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