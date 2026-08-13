## File: packages/models/src/models/OEmbedCache.ts

```typescript
import type { IOEmbedCache, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IOEmbedCacheModel } from '@rocket.chat/model-typings';
import type { Collection, Db, DeleteResult, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class OEmbedCacheRaw extends BaseRaw<IOEmbedCache> implements IOEmbedCacheModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOEmbedCache>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async createWithIdAndData(_id: string, data: any): Promise<IOEmbedCache> {
        /* Implementation Hidden */
    }

	removeBeforeDate(date: Date): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```