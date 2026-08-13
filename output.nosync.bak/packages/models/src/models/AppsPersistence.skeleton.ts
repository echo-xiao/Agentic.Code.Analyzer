## File: packages/models/src/models/AppsPersistence.ts

```typescript
import type { IAppsPersistenceModel } from '@rocket.chat/model-typings';
import type { Db, DeleteResult, Filter, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class AppsPersistenceModel extends BaseRaw<any> implements IAppsPersistenceModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// Bypass trash collection
	remove(query: Filter<any>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```