## File: packages/models/src/models/UserDataFiles.ts

```typescript
import type { IUserDataFile, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IUserDataFilesModel } from '@rocket.chat/model-typings';
import type { Collection, Db, FindOptions, IndexDescription, InsertOneResult, WithId } from 'mongodb';

import { BaseUploadModelRaw } from './BaseUploadModel';

export class UserDataFilesRaw extends BaseUploadModelRaw implements IUserDataFilesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IUserDataFile>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findLastFileByUser(userId: string, options: FindOptions<IUserDataFile> = {}): Promise<IUserDataFile | null> {
        /* Implementation Hidden */
    }

	// INSERT
	create(data: IUserDataFile): Promise<InsertOneResult<WithId<IUserDataFile>>> {
        /* Implementation Hidden */
    }
}

```