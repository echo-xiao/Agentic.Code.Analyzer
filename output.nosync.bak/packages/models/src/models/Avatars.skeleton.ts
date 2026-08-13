## File: packages/models/src/models/Avatars.ts

```typescript
import type { IAvatar, RocketChatRecordDeleted, IUser } from '@rocket.chat/core-typings';
import type { IAvatarsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, IndexDescription, FindOptions } from 'mongodb';

import { BaseUploadModelRaw } from './BaseUploadModel';

export class AvatarsRaw extends BaseUploadModelRaw implements IAvatarsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IAvatar>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByUserId(userId: IUser['_id'], options?: FindOptions<IAvatar>) {
        /* Implementation Hidden */
    }

	findOneByETag(etag: string, options?: FindOptions<IAvatar>): Promise<IAvatar | null> {
        /* Implementation Hidden */
    }
}

```