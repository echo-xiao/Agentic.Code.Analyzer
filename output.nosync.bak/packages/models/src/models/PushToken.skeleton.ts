## File: packages/models/src/models/PushToken.ts

```typescript
import type { IPushToken, IUser, AtLeast } from '@rocket.chat/core-typings';
import type { IPushTokenModel } from '@rocket.chat/model-typings';
import type { Db, DeleteResult, FindOptions, IndexDescription, InsertOneResult, UpdateResult, FindCursor } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class PushTokenRaw extends BaseRaw<IPushToken> implements IPushTokenModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	countApnTokens() {
        /* Implementation Hidden */
    }

	countGcmTokens() {
        /* Implementation Hidden */
    }

	countTokensByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	async findFirstByUserId<T extends IPushToken>(userId: IUser['_id'], options: FindOptions<IPushToken> = {}): Promise<T | null> {
        /* Implementation Hidden */
    }

	findAllTokensByUserId<T extends IPushToken>(userId: IUser['_id'], options?: FindOptions<IPushToken>): FindCursor<T> {
        /* Implementation Hidden */
    }

	findTokensByUserIdExceptId<T extends IPushToken>(
		userId: IUser['_id'],
		idToIgnore: IPushToken['_id'],
		options?: FindOptions<IPushToken>,
	): FindCursor<T> {
        /* Implementation Hidden */
    }

	async insertToken(data: AtLeast<IPushToken, 'token' | 'authToken' | 'appName' | 'userId'>): Promise<InsertOneResult<IPushToken>> {
        /* Implementation Hidden */
    }

	async refreshTokenById(
		id: IPushToken['_id'],
		data: Pick<IPushToken, 'token' | 'appName' | 'authToken' | 'userId' | 'voipToken'>,
	): Promise<UpdateResult<IPushToken>> {
        /* Implementation Hidden */
    }

	findOneByTokenAndAppName(token: IPushToken['token'], appName: IPushToken['appName']): Promise<IPushToken | null> {
        /* Implementation Hidden */
    }

	removeByUserIdExceptTokens(userId: string, tokens: IPushToken['authToken'][]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeDuplicateTokens(tokenData: Pick<IPushToken, '_id' | 'token' | 'appName' | 'authToken'>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeAllByUserId(userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeAllByTokenStringAndUserId(token: string, userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async removeOrUnsetByTokenString(token: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```