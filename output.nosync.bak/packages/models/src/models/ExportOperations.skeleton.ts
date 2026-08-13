## File: packages/models/src/models/ExportOperations.ts

```typescript
import type { IExportOperation, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IExportOperationsModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class ExportOperationsRaw extends BaseRaw<IExportOperation> implements IExportOperationsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IExportOperation>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOnePending(): Promise<IExportOperation | null> {
        /* Implementation Hidden */
    }

	async create(data: IExportOperation): Promise<string> {
        /* Implementation Hidden */
    }

	findLastOperationByUser(userId: string, fullExport = false): Promise<IExportOperation | null> {
        /* Implementation Hidden */
    }

	findAllPendingBeforeMyRequest(requestDay: Date): FindCursor<IExportOperation> {
        /* Implementation Hidden */
    }

	countAllPendingBeforeMyRequest(requestDay: Date): Promise<number> {
        /* Implementation Hidden */
    }

	updateOperation(data: IExportOperation): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```