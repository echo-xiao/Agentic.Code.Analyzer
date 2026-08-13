## File: apps/meteor/ee/server/models/raw/LivechatTag.ts

```typescript
import type { ILivechatTag } from '@rocket.chat/core-typings';
import type { ILivechatTagModel } from '@rocket.chat/model-typings';
import { BaseRaw } from '@rocket.chat/models';
import type { Db, DeleteResult, FindCursor, FindOptions, IndexDescription } from 'mongodb';

export class LivechatTagRaw extends BaseRaw<ILivechatTag> implements ILivechatTagModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findInIds(ids: string[], options?: FindOptions<ILivechatTag>): FindCursor<ILivechatTag> {
        /* Implementation Hidden */
    }

	async createOrUpdateTag(
		_id: string | undefined,
		{ name, description }: { name: string; description?: string },
		departments: string[] = [],
	): Promise<Omit<ILivechatTag, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	// REMOVE
	override removeById(_id: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```