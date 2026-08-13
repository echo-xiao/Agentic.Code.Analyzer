## File: packages/models/src/models/MediaCallChannels.ts

```typescript
import type { IMediaCallChannel, RocketChatRecordDeleted, MediaCallSignedActor } from '@rocket.chat/core-typings';
import type { IMediaCallChannelsModel, InsertionModel } from '@rocket.chat/model-typings';
import type { IndexDescription, Collection, Db, UpdateFilter, UpdateOptions, UpdateResult, FindOptions, Document } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class MediaCallChannelsRaw extends BaseRaw<IMediaCallChannel> implements IMediaCallChannelsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IMediaCallChannel>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	public findOneByCallIdAndSignedActor<T extends Document = IMediaCallChannel>(
		params: MediaCallSignedActor & { callId: string },
		options?: FindOptions<T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	public updateOneById(
		_id: string,
		update: UpdateFilter<IMediaCallChannel> | Partial<IMediaCallChannel>,
		options?: UpdateOptions,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public createOrUpdateChannel(channel: InsertionModel<IMediaCallChannel>): Promise<IMediaCallChannel | null> {
        /* Implementation Hidden */
    }

	public async setState(_id: string, state: IMediaCallChannel['state']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async setActiveById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```