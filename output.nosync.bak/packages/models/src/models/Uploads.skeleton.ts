## File: packages/models/src/models/Uploads.ts

```typescript
// TODO: Lib imports should not exists inside the raw models
import type { IUpload, RocketChatRecordDeleted, IRoom } from '@rocket.chat/core-typings';
import type { FindPaginated, IUploadsModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Collection, FindCursor, Db, IndexDescription, WithId, Filter, FindOptions, UpdateResult } from 'mongodb';

import { BaseUploadModelRaw } from './BaseUploadModel';

export class UploadsRaw extends BaseUploadModelRaw implements IUploadsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IUpload>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findNotHiddenFilesOfRoom(roomId: string, searchText: string, fileType: string, limit: number): FindCursor<IUpload> {
        /* Implementation Hidden */
    }

	findByFederationMediaIdAndServerName(mediaId: string, serverName: string): Promise<IUpload | null> {
        /* Implementation Hidden */
    }

	setFederationInfo(fileId: IUpload['_id'], info: Required<IUpload>['federation']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findPaginatedWithoutThumbs(query: Filter<IUpload> = {}, options?: FindOptions<IUpload>): FindPaginated<FindCursor<WithId<IUpload>>> {
        /* Implementation Hidden */
    }

	findImagesByRoomId(
		rid: IRoom['_id'],
		uploadedAt?: Date,
		options: Omit<FindOptions<IUpload>, 'sort'> = {},
	): FindPaginated<FindCursor<WithId<IUpload>>> {
        /* Implementation Hidden */
    }

	findAllByOriginalFileId(originalFileId: string, options: FindOptions<IUpload> = {}): FindCursor<IUpload> {
        /* Implementation Hidden */
    }
}

```