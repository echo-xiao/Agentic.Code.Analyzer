## File: apps/meteor/ee/server/models/raw/ReadReceiptsArchive.ts

```typescript
import type { IReadReceipt } from '@rocket.chat/core-typings';
import type { IReadReceiptsModel } from '@rocket.chat/model-typings';
import { BaseRaw, readSecondaryPreferred } from '@rocket.chat/models';
import type { FindCursor, Db, IndexDescription, DeleteResult } from 'mongodb';

export class ReadReceiptsArchiveRaw extends BaseRaw<IReadReceipt> implements IReadReceiptsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByMessageId(messageId: string): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }

	// Archive doesn't need all the delete methods from hot storage
	// But we implement them to satisfy the interface
	removeByUserId(userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomId(roomId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomIds(roomIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageId(messageId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageIds(messageIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findOlderThan(date: Date): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }
}

```