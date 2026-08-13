## File: packages/models/src/models/LivechatTrigger.ts

```typescript
import type { ILivechatTrigger, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ILivechatTriggerModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, IndexDescription, UpdateFilter, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class LivechatTriggerRaw extends BaseRaw<ILivechatTrigger> implements ILivechatTriggerModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatTrigger>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findEnabled(): FindCursor<ILivechatTrigger> {
        /* Implementation Hidden */
    }

	updateById(_id: string, data: Omit<ILivechatTrigger, '_id' | '_updatedAt'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```