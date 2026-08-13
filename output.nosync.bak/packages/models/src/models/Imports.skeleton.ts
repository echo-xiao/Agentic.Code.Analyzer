## File: packages/models/src/models/Imports.ts

```typescript
import type { IImport } from '@rocket.chat/core-typings';
import type { IImportsModel } from '@rocket.chat/model-typings';
import type { Db, Document, FindCursor, FindOptions, UpdateResult, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class ImportsModel extends BaseRaw<IImport> implements IImportsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findLastImport(): Promise<IImport | undefined> {
        /* Implementation Hidden */
    }

	async hasValidOperationInStatus(allowedStatus: IImport['status'][]): Promise<boolean> {
        /* Implementation Hidden */
    }

	invalidateAllOperations(): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	invalidateOperationsExceptId(id: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findAllPendingOperations(options: FindOptions<IImport> = {}): FindCursor<IImport> {
        /* Implementation Hidden */
    }

	async increaseTotalCount(id: string, recordType: 'users' | 'channels' | 'messages', increaseBy = 1): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async setOperationStatus(id: string, status: IImport['status']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```