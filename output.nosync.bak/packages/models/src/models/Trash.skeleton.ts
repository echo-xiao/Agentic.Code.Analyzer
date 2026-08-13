## File: packages/models/src/models/Trash.ts

```typescript
import type { RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class TrashRaw extends BaseRaw<RocketChatRecordDeleted<any>> {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] | undefined {
        /* Implementation Hidden */
    }
}

```