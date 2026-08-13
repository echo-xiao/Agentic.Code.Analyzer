## File: packages/models/src/models/IntegrationHistory.ts

```typescript
import type { IIntegrationHistory } from '@rocket.chat/core-typings';
import type { IIntegrationHistoryModel } from '@rocket.chat/model-typings';
import type { Db, IndexDescription, InsertOneResult, FindOneAndUpdateOptions } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class IntegrationHistoryRaw extends BaseRaw<IIntegrationHistory> implements IIntegrationHistoryModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	removeByIntegrationId(integrationId: string): ReturnType<BaseRaw<IIntegrationHistory>['deleteMany']> {
        /* Implementation Hidden */
    }

	findOneByIntegrationIdAndHistoryId(integrationId: string, historyId: string): Promise<IIntegrationHistory | null> {
        /* Implementation Hidden */
    }

	async create(integrationHistory: IIntegrationHistory): Promise<InsertOneResult<IIntegrationHistory>> {
        /* Implementation Hidden */
    }

	async updateById(
		_id: IIntegrationHistory['_id'],
		data: Partial<IIntegrationHistory>,
		options?: FindOneAndUpdateOptions,
	): Promise<IIntegrationHistory | null> {
        /* Implementation Hidden */
    }
}

```