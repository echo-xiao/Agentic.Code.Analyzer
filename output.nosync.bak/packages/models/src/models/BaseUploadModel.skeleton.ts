## File: packages/models/src/models/BaseUploadModel.ts

```typescript
import type { EncryptedContent, IUpload } from '@rocket.chat/core-typings';
import type { IBaseUploadsModel } from '@rocket.chat/model-typings';
import type {
	DeleteResult,
	IndexDescription,
	UpdateResult,
	Document,
	InsertOneResult,
	WithId,
	Filter,
	FindOptions,
	FindCursor,
	ClientSession,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';

type T = IUpload;

export abstract class BaseUploadModelRaw extends BaseRaw<T> implements IBaseUploadsModel<T> {
	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async insertFileInit(userId: string, store: string, file: { name: string }, extra: object = {}): Promise<InsertOneResult<WithId<T>>> {
        /* Implementation Hidden */
    }

	updateFileComplete(fileId: string, userId: string, file: object): Promise<Document | UpdateResult> | undefined {
        /* Implementation Hidden */
    }

	confirmTemporaryFile(fileId: string, userId: string): Promise<Document | UpdateResult> | undefined {
        /* Implementation Hidden */
    }

	findByIds(_ids: string[], options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }

	async findOneByName(name: string, options?: { session?: ClientSession }): Promise<T | null> {
        /* Implementation Hidden */
    }

	async findOneByRoomId(rid: string): Promise<T | null> {
        /* Implementation Hidden */
    }

	findExpiredTemporaryFiles(options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }

	async updateFileNameById(fileId: string, name: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async deleteFile(fileId: string, options?: { session?: ClientSession }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async findOneByIdAndUserIdAndRoomId(fileId: string, userId: string, rid: string, options?: FindOptions<T>): Promise<T | null> {
        /* Implementation Hidden */
    }

	async updateFileMetadata(
		fileId: string,
		userId: string,
		metadata: { name?: string; description?: string; typeGroup?: string; content?: EncryptedContent },
	): Promise<UpdateResult | null> {
        /* Implementation Hidden */
    }
}

```