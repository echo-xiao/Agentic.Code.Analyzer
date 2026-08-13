## File: packages/models/src/models/MessageReads.ts

```typescript
import type { MessageReads, IUser, IMessage, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IMessageReadsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class MessageReadsRaw extends BaseRaw<MessageReads> implements IMessageReadsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<MessageReads>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findOneByUserIdAndThreadId(userId: IUser['_id'], tmid: IMessage['_id']): Promise<MessageReads | null> {
        /* Implementation Hidden */
    }

	getMinimumLastSeenByThreadId(tmid: IMessage['_id']): Promise<MessageReads | null> {
        /* Implementation Hidden */
    }

	updateReadTimestampByUserIdAndThreadId(userId: IUser['_id'], tmid: IMessage['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async countByThreadAndUserIds(tmid: IMessage['_id'], userIds: IUser['_id'][]): Promise<number> {
        /* Implementation Hidden */
    }

	async countByThreadId(tmid: IMessage['_id']): Promise<number> {
        /* Implementation Hidden */
    }
}

```