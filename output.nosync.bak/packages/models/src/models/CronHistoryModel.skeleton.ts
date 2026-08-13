## File: packages/models/src/models/CronHistoryModel.ts

```typescript
import type { ICronHistoryItem } from '@rocket.chat/core-typings';
import type { ICronHistoryModel } from '@rocket.chat/model-typings';
import type { Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CronHistoryRaw extends BaseRaw<ICronHistoryItem> implements ICronHistoryModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }
}

```