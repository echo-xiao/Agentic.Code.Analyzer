## File: packages/models/src/models/AppLogsModel.ts

```typescript
import type { IAppLogsModel } from '@rocket.chat/model-typings';
import type { Db, DeleteResult, Filter, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class AppsLogsModel extends BaseRaw<any> implements IAppLogsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async getDistinctFieldsForFilters(appId: string): Promise<{ instanceIds: string[]; methods: string[] }> {
        /* Implementation Hidden */
    }

	remove(query: Filter<any>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```